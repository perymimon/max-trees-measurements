import {csvParser} from "./helper/csvParsers";
import {proxy, ref} from "valtio";
import {derive} from 'valtio/utils'
import {async} from "./helper/events";

let csvFiles = import.meta.glob('/public/data/*.csv', {as: 'raw'});
console.log('files', csvFiles);
const checkDays = new Set(['2020-03-13', '2020-08-02']);
const state = (function () {

    const rawState = {
        days: Array.from(checkDays),
        dayIndex: 0,
        weight: 0,
        daysData: ref(new Map()),
        markers: [],
        focus: null // index of tree
    }

    // fill the state with daysdata
    for (let day of rawState.days) {
        const dayData = processDataOfDay(day);
        rawState.daysData.set(day, dayData)
    }
    csvFiles = false; // (clean memory)


    return proxy(rawState)
})()

const getters = {
    dayName(get) {
        let s = get(state)
        return s.days[s.dayIndex];
    },
    dayInfo(get) {
        let s = get(state)
        return s.daysData.get(s.dayName);
    },
    board(get) {
        let s = get(state)
        let dd = s.dayInfo;
        let {columns, rows} = dd;
        return {
            cx: (columns - 1) / 2, cy: (rows - 1) / 2,
            w: columns, h: rows,
            len: columns * rows,
            xi(i) {
                let {board} = state;
                return i % board.w;
            },
            yi(i) {
                let {board} = state;
                return Math.floor(i / board.w);
            },
            xy(i) {
                let {cx, cy, xi, yi} = state.board;
                return {
                    x: cx - xi(i),
                    y: cy - yi(i)
                }

            },
        }
    },
}

export const actions = {
    setDay(event) {
        state.dayStart = event.pageStart;
    },
    updateDay(dayIndex) {
        state.dayIndex = dayIndex
    },
    markColumns(columns) {
        let {cx, h} = state.board;
        let markers = [];
        for (let index of columns) {
            let marker = {
                x: cx - index, y: 0, w: 1, h: h, color: 'white', text: '',
            }
            markers.push(marker);
        }
        state.markers = markers;
    },
    markRows(rows) {
        let {cy, w} = state.board;
        let markers = [];
        for (let index of rows) {
            let marker = {
                x: 0, y: cy - index, w: w, h: 1, color: 'white', text: '',
            }
            markers.push(marker);
        }
        state.markers = markers;
    },
    markIndex(index) {
        let {board} = state;
        let {x, y} = board.xy(index);
        let marker = {
            x, y, w: 1, h: 1, color: 'white', text: '',
        }
        state.markers = [marker];
    },
    setFocus(index) {
        if (state.focus === index) {
            state.focus = null;
        } else {
            state.focus = index;
        }
    },
    addDay(files) {
        let {daysData} = state;
        const dayData = processFiles(files)
        daysData.set(day, daysData)
    },
    async applyFilesDay(group) {
        if (!checkDays.has(group.day)) {
            const dayData = await processFiles(group);
            checkDays.add(dayData.day)
            state.daysData.set(dayData.day, dayData)
            state.days.push(dayData.day)
        }
        return true;
    }
}



// const state = proxyWithComputed(rawState, getters2)
// as derive define it run all getters and evaluate them
derive(getters, {proxy: state})
export default state


async function processFiles(group) {
    const reader = new FileReader();
    let result = {};

    for (let file of group.files) {
        let dateClassed = /watered|flowering_bot|flowering_top/
        reader.readAsText(file)
        await async(reader, 'load')
        let type = file.name.match(dateClassed)
        result[type] = csvParser(reader.result, {excludeHeader: true, removeFirstColumn: true});
    }

    return processDayData(
        group.day,
        result.flowering_top,
        result.flowering_bot,
        result.watered
    );
}

function processDataOfDay(day) {
    let [tops, bottoms, watered] = [
        `/public/data/${day} - flowering_top.csv`,
        `/public/data/${day} - flowering_bot.csv`,
        `/public/data/${day} - watered.csv`,
    ].map(fileName => csvFiles[fileName])
        .map(fileString => csvParser(fileString, {excludeHeader: true, removeFirstColumn: true}))

    return processDayData(day, tops, bottoms, watered);
}

function processDayData(day, tops, bottoms, watered) {

    let columns = tops[0].length;
    let rows = tops.length;
    tops = tops.flat();
    bottoms = bottoms.flat();
    watered = watered.flat();

    let datums = tops.map((_, index) => {
        return {
            index: index,
            densities: [+tops[index], +bottoms[index]],
            // top: +tops[index],
            // bottom: +bottoms[index],
            watered: +watered[index],
        }
    })

    return {day, datums, columns, rows}
}


// const getters2 = {
//     dayName(snap){
//         let s = snap;
//         return s.days[s.dayIndex];
//     },
//     currentDayData(snap){
//         let s = snap;
//         return rawState.daysData.get(s.dayName);
//     }
//
// }
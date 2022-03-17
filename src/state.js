import {csvParser} from "./helper/csvParsers";
import {proxy, ref} from "valtio";
import {derive} from 'valtio/utils'

const csvFiles = import.meta.glob('/public/data/*.csv', {assert: {type: 'raw'}});
console.log('files', csvFiles);
const rawState = {
    days: ['2020-03-13', '2020-08-02'],
    dayStart: 0,
    dayEnd: 1,
    weight: 0,
    daysData: ref(new Map()),
    markers: [],
    focus: null // index of tree
}

const getters = {
    dayName(get) {
        let s = get(state)
        return s.days[s.dayStart];
    },
    dayStartName(get) {
        let s = get(state)
        return s.days[s.dayStart];
    },
    dayEndName(get) {
        let s = get(state)
        return s.days[s.dayEnd];
    },
    dayInfo(get) {
        let s = get(state)
        // let ds = s.daysData.get(s.dayStartName);
        // let de = s.daysData.get(s.dayEndName);
        // let w = s.weight;
        // let d = [];
        // let {datums: dsDatums, columns, rows} = ds, {datums: deDatums} = de;
        //
        // for (let i = 0; i < dsDatums.length; i++) {
        //     let dsDatumI = dsDatums[i], deDatumI = deDatums[i];
        //
        //     let top = (dsDatumI.top + (deDatumI.top - dsDatumI.top) * w).toFixed(0);
        //     let bottom = (dsDatumI.bottom + (deDatumI.bottom - dsDatumI.bottom) * w).toFixed(0);
        //     let watered = (dsDatumI.watered + (deDatumI.watered - dsDatumI.watered) * w).toFixed(0);
        //     d.push({
        //         densities: [top, bottom],
        //         top,
        //         bottom,
        //         watered
        //     });
        // }
        //
        // return {
        //     columns, rows,
        //     datums: d,
        //     weight: w,
        //     dayStart: s.dayStartName, dayEnd: s.dayEndName, day: s.dayStartName
        // };

        return s.daysData.get(s.dayStartName);
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
    updateDay(event) {
        const {pageStart, pageEnd, weight} = event;
        Object.assign(state,{
            dayStart:pageStart,
            dayEnd:pageEnd,
            weight
        });

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
}


// fill the state with daysdata
for (let day of rawState.days) {
    const dayData = processDataOfDay(day);
    rawState.daysData.set(day, dayData)
}
const state = proxy(rawState)
// const state = proxyWithComputed(rawState, getters2)
// as derive define it run all getters and evaluate them
derive(getters, {proxy: state})


function processDataOfDay(day) {

    let [tops, bottoms, watered] = [
        `/public/data/${day} - flowering_top.csv`,
        `/public/data/${day} - flowering_bot.csv`,
        `/public/data/${day} - watered.csv`,
    ]
        .map(fileName => csvFiles[fileName])
        .map(fileString => csvParser(fileString, {excludeHeader: true, removeFirstColumn: true}))

    let columns = tops[0].length;
    let rows = tops.length;
    tops = tops.flat();
    bottoms = bottoms.flat();
    watered = watered.flat();

    let datums = tops.map((_, index) => {
        return {
            densities: [+tops[index], +bottoms[index]],
            top: +tops[index],
            bottom: +bottoms[index],
            watered: +watered[index],
        }
    })

    return {day, datums, columns, rows}
}

export default state

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
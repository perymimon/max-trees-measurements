import {csvParser} from "./helper/csvParsers";
import {proxy, ref} from "valtio";

const csvFiles = import.meta.glob('/data/*.csv', {assert: {type: 'raw'}})
// console.log('files', csvFiles);
const rawState = {
    days: ['2020-03-13', '2020-08-02'],
    dayIndex: 0,
    daysData: ref(new Map()),
    marker:[],
}

// fill the state with daysdata
for(let day of rawState.days) {
    const dayData = processDataOfDay(day);
    rawState.daysData.set(day, dayData)
}

export function processDataOfDay(day) {

    let [tops, bottoms, watered] = [
        `/data/${day} - flowering_top.csv`,
        `/data/${day} - flowering_bot.csv`,
        `/data/${day} - watered.csv`,
    ]
        .map(fileName => csvFiles[fileName])
        .map(fileString => csvParser(fileString, {excludeHeader: true, removeFirstColumn: true}))

    let columns = tops[0].length;
    let rows = tops.length;
    tops = tops.flat();
    bottoms = bottoms.flat();
    watered = watered.flat();

    let datums = tops.map((_,index) => {
        return {
            densities: [tops[index], bottoms[index]],
            top: tops[index],
            bottom: bottoms[index],
            watered: watered[index],
        }
    })

    return {day, datums, columns, rows}
}

export default proxy(rawState)

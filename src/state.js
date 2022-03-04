import {csvParser} from "./helper/csvParsers";
import {proxy} from "valtio";

const csvFiles = import.meta.glob('/data/*.csv', {assert: {type: 'raw'}})
console.log('files', csvFiles);

const rawState = {
    days: ['2020-03-13', '2020-08-02'],
    dayIndex: 0,
    daysData: new Map(),
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

    return {tops, bottoms, watered, day}
}

export default proxy(rawState)

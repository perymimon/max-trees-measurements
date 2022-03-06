import Markers from "../components/tree-fiver/Markers";
import React from "react";
import {Trees} from "/src/components/tree-fiver/3d-Tree";
import {ScrollControls} from "@react-three/drei";
import proxyState from "../state";
import {useSnapshot} from "valtio";
import {Minimap} from "/src/components/tree-fiver/MiniMap";

import '/src/myModification/controls.css'

export function Groves() {

    const snap = useSnapshot(proxyState);
    const day = snap.days[snap.dayIndex]
    const dayData = snap.daysData.get(day)

    function handleColumnOver(markers) {
        // console.log('Column', markers)
        const {columns, datums} = dayData;
        let indexs = []
        for (let index of markers) {
            for (let i = index; i < datums.length; i += columns) {
                indexs.push(i)
            }
        }

        proxyState.marker = indexs
    }

    function handleRowOver(markers) {
        // console.log('row', markers)
        const {columns} = dayData;
        let indexs = []
        for (let index of markers) {
            let set = Array.from({length: columns}, (_, i) => index * columns + i)
            indexs.push(...set)
        }
        proxyState.marker = indexs
    }


    function handlePageIndex(pageIndex) {
        proxyState.dayIndex = pageIndex
    }

    return (
        <ScrollControls damping={10} distance={1} pages={snap.days.length}>
            <Minimap items={snap.days}
                     onPageChange={handlePageIndex}
            />
            <Markers length={dayData.rows}
                     position={[-dayData.columns / 2 + .5, 2.5, 0]}
                     rotation={[0, -Math.PI / 2, 0]}
                     onOver={i => handleRowOver(i)}/>
            <Markers length={dayData.columns}
                     position={[0, 2.5, -dayData.rows / 2]}
                     onOver={i => handleColumnOver(i)}/>
            <Trees {...dayData} markers={snap.marker}/>
        </ScrollControls>
    )
}

export default Groves;
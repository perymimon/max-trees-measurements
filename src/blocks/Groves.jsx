import Ruler from "../components/tree-fiver/Ruler";
import React from "react";
import {Trees} from "/src/components/tree-fiver/3d-Tree";
import {ScrollControls} from "@react-three/drei";
import proxyState, {actions} from "/src/state";
import {useSnapshot} from "valtio";
import {Minimap} from "/src/components/tree-fiver/MiniMap";

import '/src/myModification/controls.css'
import Grounds from "./Grounds";
import Markers from "../blocks/Marker";

function handleColumnOver(markers) {
    actions.markColumns(markers);
}

function handleRowOver(markers) {
    actions.markRows(markers);
}

function handlePageIndex(pageIndex) {
    proxyState.dayIndex = pageIndex
}


export function Groves() {

    const snap = useSnapshot(proxyState);
    const {board} = snap
    console.log(board);


    return (
        <ScrollControls damping={10} distance={1} pages={snap.days.length}>
            <Minimap items={snap.days} onPageChange={handlePageIndex}/>
            <Ruler length={board.h}
                   position={[board.cx + 1, -2, 0]}
                   rotation={[0, -Math.PI / 2, 0]}
                   onOver={i => handleRowOver(i)}/>
            <Ruler length={board.w}
                   position={[0, -2, -(board.cy + 1)]}
                   onOver={i => handleColumnOver(i)}/>
            <Markers markers={snap.markers}/>
            <Grounds size={0.9}/>
            <Trees/>
        </ScrollControls>
    )


}

export default Groves;
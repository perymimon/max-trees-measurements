import Ruler from "../components/tree-fiver/Ruler";
import {Trees} from "/src/components/tree-fiver/3d-Tree";
import {ScrollControls} from "@react-three/drei";
import proxyState, {actions} from "/src/state";
import {useSnapshot} from "valtio";
import {Minimap} from "/src/components/tree-fiver/MiniMap";

import '/src/myModification/controls.css'
import Grounds from "./Grounds";
import Markers from "../blocks/Marker";

export function Groves() {
    console.log('rendering Groves')

    const snap = useSnapshot(proxyState);
    const {board} = snap

    return (
        <ScrollControls damping={1} distance={.2} pages={snap.days.length}>
            <Minimap items={snap.days} onPageMove={actions.updateDay}/>
            <Ruler length={board.h}
                   position={[board.cx + 1, -2, 0]}
                   rotation={[0, -Math.PI / 2, 0]}
                   onOver={actions.markRows}/>
            <Ruler length={board.w}
                   position={[0, -2, -(board.cy + 1)]}
                   onOver={actions.markColumns}/>
            <Markers />
            <Grounds size={0.9}/>
            <Trees/>
        </ScrollControls>
    )


}

export default Groves;
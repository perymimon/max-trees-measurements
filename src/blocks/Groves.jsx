import Ruler from "../components/tree-fiver/Ruler";
import {Trees} from "/src/components/tree-fiver/3d-Tree";
import {ScrollControls} from "@react-three/drei";
import proxyState, {actions} from "/src/state";
import {useSnapshot} from "valtio";
import {Minimap} from "/src/components/tree-fiver/MiniMap";

import '/src/myModification/controls.css'
import Grounds from "./Grounds";
import Markers from "../blocks/Marker";
import Rulers from "./Rulers";
import MiniMapSun from "./MiniMapSun";

export function Groves() {
    console.log('rendering Groves')

    // const snap = useSnapshot(proxyState);

    return (
        <ScrollControls damping={1} distance={.2} pages={2}>
            <MiniMapSun/>
            <Rulers/>
            <Markers />
            <Grounds size={0.9}/>
            <Trees/>
        </ScrollControls>
    )


}

export default Groves;
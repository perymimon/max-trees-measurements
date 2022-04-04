import Ruler from "../components/tree-fiver/Ruler";
import proxyState, {actions} from "../state";
import {useSnapshot} from "valtio";


export function Rulers() {
    console.log('rendering Rulers');
    const snap = useSnapshot(proxyState);
    const {board} = snap
    return <>
        <Ruler length={board.h}
               position={[board.cx + 1, -2, 0]}
               rotation={[0, -Math.PI / 2, 0]}
               onOver={actions.markRows}/>
        <Ruler length={board.w}
               position={[0, -2, (board.cy + 1)]}
               onOver={actions.markColumns}/>
    </>
}

export default Rulers
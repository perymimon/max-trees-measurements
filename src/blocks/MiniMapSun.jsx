import proxyState, {actions} from "../state";
import {Minimap} from "../components/tree-fiver/MiniMap";
import {useSnapshot} from "valtio";


export function MiniMapSun(){
    const snap = useSnapshot(proxyState);

    return <Minimap items={snap.days} onPageMove={actions.updateDay}/>
}

export default MiniMapSun;
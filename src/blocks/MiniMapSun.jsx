import proxyState, {actions} from "../state";
import {Minimap} from "../components/tree-fiver/MiniMap";
import {useSnapshot} from "valtio";


export function MiniMapSun(){
    console.log('rendering miniMap')
    const snap = useSnapshot(proxyState);

    return <Minimap items={snap.days} index={snap.dayIndex} onPageChange={actions.updateDay}/>
}

export default MiniMapSun;
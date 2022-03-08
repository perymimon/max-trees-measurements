import {useSnapshot} from "valtio";
import proxyState, {actions} from "/src/state";
import Grid from "/src/components/Grid";

export  function TableControl(){
    const snap = useSnapshot(proxyState);

    const dayData = snap.currentDayData

    function handleHover(index) {
       actions.markIndex(index)
    }

    return (   <Grid {...dayData} markeds={snap.marker} onMouseOver={handleHover}/>)
}

export default TableControl
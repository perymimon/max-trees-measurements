import {useSnapshot} from "valtio";
import proxyState, {actions} from "/src/state";
import Grid from "/src/components/Grid";

export  function TableControl(){
    const snap = useSnapshot(proxyState);
    const dayData = snap.dayInfo

    return (   <Grid {...dayData} markeds={snap.marker}
                     onMouseOver={actions.markIndex}
                     focus={snap.focus}
                     onClick={actions.setFocus}/>)
}

export default TableControl
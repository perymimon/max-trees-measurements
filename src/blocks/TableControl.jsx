import {useSnapshot} from "valtio";
import proxyState from "/src/state";
import Grid from "/src/components/Grid";

export  function TableControl(){
    const snap = useSnapshot(proxyState);
    const day = snap.days[snap.dayIndex]
    const dayData = snap.daysData.get(day)

    function handleHover(index) {
        // console.log('hover', index)
        proxyState.marker = [index]
    }

    return (   <Grid {...dayData} markeds={snap.marker} onMouseOver={handleHover}/>)
}

export default TableControl
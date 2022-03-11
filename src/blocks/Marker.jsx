import { MeshBasicMaterial} from "three";
import {useSnapshot} from "valtio";
import proxyState from "/src/state";

const markerMaterials = new MeshBasicMaterial({
    color: 'white',
    transparent: true,
    opacity: 0.8,
})

export default function Markers(props){
    const snap = useSnapshot(proxyState);

    return (
        <>
            {snap.markers.map((block, index) => {
                const {x, y, w,h} = block;
                return (
                    <mesh key={index} position={[x,0,y]}>
                        <meshBasicMaterial color="white" transparent opacity={0.8}
                                           material={markerMaterials}
                        />
                        <boxGeometry args={[w, 4, h]}/>
                    </mesh>
                )
            })}
        </>
    )
}



import {BoxGeometry, MeshBasicMaterial} from "three";
import {useRef} from "react";

const markerGeometry = new BoxGeometry(1, 4, 1)
const markerMaterials = new MeshBasicMaterial({
    color: 'white',
    transparent: true,
    opacity: 0.8,
})

export function Marker(props){
    const {marker} = props
    const {position, rotation, size} = props
    const ref = useRef()

    useFrame(() => {
        ref.current.position.copy(position)
        ref.current.rotation.copy(rotation)
        ref.current.scale.set(size, size, size)
    })

    return (
        <mesh ref={ref} name="marker" position={[0, 2, 0]}
              visible={marker}
              geometry={markerGeometry}
              material={markerMaterials}/>
    );
}

export default Marker;
import {useFrame, useThree} from "@react-three/fiber";
import {OrbitControls as _OrbitControls} from "three-stdlib";

export default function MyOrbitControls({enabled = true, azimuthalAngle = 0, polarAngle = 0}) {
    const state = useThree()
    const {gl,  camera} = state
    const controls = new _OrbitControls(camera, gl.domElement)
    useFrame(() => {
        if (controls && enabled) {
            controls.update()
        }
        if (!enabled && controls) {
            controls.setAzimuthalAngle(azimuthalAngle * Math.PI)
            controls.setPolarAngle(polarAngle * Math.PI)
        }
    })

    controls.enabled = enabled
    controls.enableDamping = true
    return null
}

// function MyOrbitControls(){
//     const treeState = useThree();
//     const { gl, scene, camera } = treeState
//     const controls = useRef()
//     useFrame(() => controls.current.update())
//
//     // const controls = new OrbitControls(camera, renderer.domElement)
//
//     return (
//     <orbitControls ref={controls} args={[treeState.camera, treeState.gl?.domElement]} enabled enableDamping/>
//   )
// }

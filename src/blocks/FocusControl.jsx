import {useSnapshot} from "valtio";
import state from "/src/state";
import {useFrame, useThree} from "@react-three/fiber";
import {Quaternion, Vector3, Object3D} from "three";
import React, {useEffect, useRef} from "react";
import {OrbitControls} from "@react-three/drei";

const GOLDENRATIO = 1.61803398875

const [pCM, q, pCL] = [new Vector3(), new Quaternion(), new Vector3()]
const [o3dCamera, o3dTarget] = [ new Object3D(), new Object3D()]

o3dTarget.isCamera = true;
o3dCamera.isCamera = true;

export function FocusControls({}) {
    const snap = useSnapshot(state)
    const {focus, board} = snap;
    const controlsRef = useRef();
    const [enabledControls, enablingControls] = React.useState(true);

    useEffect(() => {
        const {x, y} = board.xy(focus);
        if (focus !== null) {
            pCM.set(x + 2, 5, y + 2);
            pCL.set(x,0,y);
        } else {
            pCM.set(30, 10, 30);
            pCL.set(0, 0, 0);
        }

        function on(){
            console.log('enabling controls')

            const controls = controlsRef.current
            controls.target.copy(pCL)
            // controls.update();
            enablingControls(true);
        }
        const dom = document.querySelector('.tree-field');
        dom.removeEventListener("mousedown", on);
        dom.addEventListener('mousemove',on , {
            passive: true, capture: true, once: true
        })

        enablingControls(false)

    }, [focus])

    useFrame((treeState, dt) => {
        if (enabledControls) return;
        let camera = treeState.camera;
        // Auto Camera Movement
        // update camera position
            camera.position.lerp(pCM, 0.020)
        // clone camera new position
        o3dCamera.position.copy(camera.position);
        o3dCamera.lookAt(pCL)
        // update camera rotation
        camera.quaternion.slerp(o3dCamera.quaternion,  0.025)
        treeState.invalidate()

    })

return <OrbitControls ref={controlsRef}
                      minPolarAngle={-Math.PI / 2}
                      enabled={enabledControls}
                      maxPolarAngle={Math.PI / 1.7}/>
}

// useFrame((treeState, dt) => {
//     treeState.camera.position.lerp(o3d.position, 0.020)
//     // treeState.camera.quaternion.copy(o3d.quaternion)
//     treeState.invalidate();
//
// })

// if (focus !== null) {
//     o3d.position.set(x,4, y)
//     o3d.lookAt(x,0,y)
//     console.log('o3d', o3d)
//
//     // p.set(x, 4, y);
//     // q.setFromUnitVectors(new Vector3(0, 0, 1), p.clone().normalize());

//     // const focusObject = treeState.scene.getObjectByName("tree-" + focus);
//     // focusObject.updateWorldMatrix(true, false);
//     // focusObject.localToWorld(p.set(0,10, 20));
//     // focusObject.getWorldQuaternion(q);
// } else {
//     // p.set(30, 20, -30)
//     // q.identity()
//     // console.log("point", p);
//     o3d.position.set(30, 20, -30)
//     o3d.quaternion.indentity()
// }

// useEffect(() => {
//     clicked.current = ref.current.getObjectByName(params?.id)
//     if (clicked.current) {
//         clicked.current.parent.updateWorldMatrix(true, true)
//         clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
//         clicked.current.parent.getWorldQuaternion(q)
//     } else {
//         p.set(0, 0, 5.5)
//         q.identity()
//     }
// })
// useFrame((state, dt) => {
//     state.camera.position.lerp(p, 0.025)
//     state.camera.quaternion.slerp(q, 0.025)
// })

export default FocusControls;
// src/blocks/Focus.jsx

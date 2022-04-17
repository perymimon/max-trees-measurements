import React, {Suspense} from 'react'
import './App.css'
import './myModification/controls.css'

import {Canvas} from '@react-three/fiber'
import BoxModel from './components/3d-demo-Box'
import {Environment} from '@react-three/drei'
import Groves from "./blocks/Groves";
import TableControl from "./blocks/TableControl";
import Header from "./blocks/Header";
import FocusControls from "./blocks/FocusControl";
import MiniMapSun from "./blocks/MiniMapSun";

function App() {
    console.log('rendering App')

    return (
        <Suspense fallback={"Loading ..."}>
            <div className="App">
                <Header/>
                <MiniMapSun/>
                <Canvas className="tree-field" frameloop="demand"
                        gl={{antialias: true}}
                        dpr={[1, 1.5]}
                        camera={{fov: 30, position: [30, 10, 30]}}
                        linear={true}>

                    <FocusControls />
                    <Suspense fallback={"Loading Env"}>
                        <Environment preset="park" background={true}/>
                    </Suspense>
                    <ambientLight intensity={1}/>
                    {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>*/}
                    {/*<pointLight position={[-10, -10, -10]}/>*/}
                    <BoxModel position={[-1.2, 0, 0]}/>
                    <BoxModel position={[1.2, 0, 0]}/>
                    <Suspense fallback={"Loading Model"}>
                        <Groves/>
                    </Suspense>
                </Canvas>
                <div className="grid-control">
                    <TableControl/>
                </div>
                <footer>
                    Infographic implementation by <a href="https://github.com/perymimon" target="_blank">Pery Mimon</a>
                    &nbsp;
                    for <a target="_blank" href="https://facebook.com/Ampple-Apple-Mapping-101508234895620/"> Ampple - Apple Mapping</a>
                </footer>
            </div>
        </Suspense>
    )
}


export default App

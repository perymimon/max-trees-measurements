import React, {Suspense} from 'react'
import './App.css'
import './myModification/controls.css'

import {Canvas} from '@react-three/fiber'
import BoxModel from './components/3d-demo-Box'
import {Environment, OrbitControls} from '@react-three/drei'
import Groves from "./blocks/Groves";
import TableControl from "./blocks/TableControl";
import Header from "./blocks/Header";
import FocusControls from "./blocks/Focus";

function App() {
    return (
        <Suspense fallback={"Loading ..."}>
            <div className="App">
                <Header/>
                <Canvas className="tree-field" frameloop="demand"
                        gl={{antialias: true}}
                        dpr={[1, 1.5]}
                        camera={{fov: 30, position: [30, 20, -30]}}>

                    <FocusControls />
                    <Suspense fallback={"Loading Env"}>
                        <Environment preset="park" background={true}/>
                    </Suspense>
                    {/*<ambientLight intensity={0.2}/>*/}
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
                    by <a href="https://github.com/perymimon">Pery Mimon</a>
                </footer>
            </div>
        </Suspense>
    )
}


export default App

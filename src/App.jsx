import React, {Suspense} from 'react'
import './App.css'
import './myModification/controls.css'

import {Canvas} from '@react-three/fiber'
import BoxModel from './components/3d-demo-Box'
import {Environment, OrbitControls} from '@react-three/drei'

import Groves from "./blocks/Groves";
import TableControl from "./blocks/TableControl";
import Header from "./blocks/Header";

function App() {
    debugger;
    return (
        <Suspense fallback={"Loading ..."}>
            <div className="App">
                <Header/>
                <Canvas className="tree-field"
                        gl={{antialias: false}} dpr={[1, 1.5]} camera={{fov: 30, position: [30, 20, -30]}}>
                    <OrbitControls minPolarAngle={-Math.PI / 2}
                                   maxPolarAngle={Math.PI / 1.7}/>
                    <Environment preset="park" background={true}/>
                    {/*<ambientLight intensity={0.2}/>*/}
                    {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>*/}
                    {/*<pointLight position={[-10, -10, -10]}/>*/}
                    <BoxModel position={[-1.2, 0, 0]}/>
                    <BoxModel position={[1.2, 0, 0]}/>
                    <Groves/>
                </Canvas>
                <TableControl/>
                <footer>
                    by <a href="https://github.com/perymimon">Pery Mimon</a>
                </footer>
            </div>
        </Suspense>
    )
}


export default App

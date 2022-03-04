import {useRef, useState, Suspense, useMemo} from 'react'
import logo from './logo.svg'
import './App.css'

import {Canvas, useFrame, extend, useThree} from '@react-three/fiber'
import {Trees} from './components/3d-Tree'
import BoxModel from './components/3d-demo-Box'

import Time from './components/demo-async-hook'
import {
    Environment
} from '@react-three/drei'
import {proxy, useSnapshot} from 'valtio'

import OrbitControls from "./components/OrbitalControl";
// import Floor from "./components/Floor";
import {ScrollControls, Scroll} from "@react-three/drei";
import {Minimap} from "./components/tree-fiver/MiniMap";

import proxyState from './state'

function App() {

    const snap = useSnapshot(proxyState);
    const day = snap.days[snap.dayIndex]
    const dayData = snap.daysData.get(day)

    return (
        <div className="App">
            <header className="App-header">
                <Time/>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Hello Tree Measurements day {snap.days[snap.dayIndex]}</p>
            </header>
            <Canvas gl={{antialias: false}} dpr={[1, 1.5]} camera={{fov: 30, position: [30, 20, -30]}}>
                {/*<orbitControls enableDamping />*/}
                <OrbitControls/>
                <Suspense fallback={"Loading Environment..."}>
                    <Environment preset={"forest"} background={true}/>
                </Suspense>
                <ambientLight intensity={0.2}/>
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}/>
                <pointLight position={[-10, -10, -10]}/>
                <BoxModel position={[-1.2, 0, 0]}/>
                <BoxModel position={[1.2, 0, 0]}/>

                {/*<Floor  position={[0,-3,0]} color={"green"} />*/}
                {/*<ScrollControls horizontal damping={10} pages={(width - xW + urls.length * xW) / width}>*/}
                <ScrollControls horizontal damping={8} distance={4} pages={snap.days.length}>
                    <Minimap items={snap.days} onPageChange={pageIndex => void (proxyState.dayIndex = pageIndex)}/>
                    <Suspense fallback={"Loading model..."}>
                        <Trees {...dayData} />
                    </Suspense>
                </ScrollControls>
            </Canvas>
            <footer>
                by <a href="https://github.com/perymimon">Pery Mimon</a>
            </footer>
        </div>
    )
}

export default App

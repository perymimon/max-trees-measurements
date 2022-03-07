import React, {useRef} from "react";
import {useGLTF, Text, shaderMaterial} from "@react-three/drei";
import {domain2range} from "/src/helper/math";
import {Color, BoxGeometry, MeshStandardMaterial, MeshBasicMaterial} from "three";
import LetMap from "/src/helper/let-map";

import basicVertex from "/src/shaders/basicVertex.glsl?raw";
import foliageFragment from "/src/shaders/foliageFragment.glsl?raw";
import {extend} from "@react-three/fiber";

const modelUrl = './3d-models/treeModel-low.glb'

const ColorShiftMaterial = shaderMaterial(
    {time: 0, topColor: [1.0, 0.0, 0.0], bottomColor: [0.0, 0.0, 1.0]},
    // vertex shader
    basicVertex,
    // fragment shader
    foliageFragment
)
extend({ColorShiftMaterial})

const normalDensity = domain2range([0, 500], [0.2, 1]);
const treeHeightScale = domain2range([0, 4], [0.5, 2]);

const foliageColor = (density) => {
    const color = new Color();
    color.setHSL(0.22, normalDensity(density), 0.5);
    return color;
}



const foliageMaterials = new LetMap(([topDensity, bottomDensity]) => {
    return <colorShiftMaterial attach="material"
                               topColor={foliageColor(topDensity)}
                               bottomColor={foliageColor(bottomDensity)} time={1}/>

}, (densities) => densities.join(','))

export function Trees(props) {
    const {datums, columns, rows, markers} = props;

    let cx = ((columns - 1) / 2)
    let cz = ((rows - 1) / 2)

    return datums.map((data, index) => {
        let x = index % columns
        let z = Math.floor(index / columns)

        return <Tree key={index}
                     position={[cx - x, -2, cz - z]}
                     marker={markers.includes(index)}
                     data={data}
                     index={index}
        />

    })
}

export default function Tree(props) {
    const {index, marker} = props;
    const {densities, watered} = props.data;
    const {nodes, materials} = useGLTF(modelUrl);
    const group = useRef();
    const heightScale = treeHeightScale(watered)

    const leafGeometry = nodes.Plane283.geometry
    const leafMaterial = nodes.Plane283.material


    return (
        <group ref={group} {...props} dispose={null} raycast={() => null}>
            <Text position={[0, .5, 0]}
                  rotation={[Math.PI /2, Math.PI, 0]}
                  fontSize={.4}>{index}</Text>





            <mesh name="breed"
                  geometry={nodes.Circle025.geometry}
                  material={materials.Wood}
                  rotation={[-Math.PI, -0.19, -Math.PI]}
                  scale={[1, heightScale, 1]}
            />
            <mesh name="foliage"
                  visible={true}
                  geometry={nodes.Roundcube028.geometry}
                  position={[0, heightScale + .1, 0]}
            >
                {foliageMaterials.let(densities)}

                {/*<mesh*/}
                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.16, 0.28, 0.32]}*/}
                {/*    rotation={[0.89, -0.16, -0.33]}*/}
                {/*    scale={0.62}*/}
                {/*/>*/}
                {/*<mesh*/}
                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.26, 0.26, 0.27]}*/}
                {/*    rotation={[1.41, 0.6, -0.71]}*/}
                {/*    scale={0.62}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.32, 0.32, -0.07]}*/}
                {/*    rotation={[1.9, 0.59, -1.86]}*/}
                {/*    scale={[0.62, 0.62, 0.62]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[-0.25, 0.06, 0.37]}*/}
                {/*    rotation={[1.54, -0.13, 0.64]}*/}
                {/*    scale={0.62}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[-0.34, 0.1, 0.28]}*/}
                {/*    rotation={[1.42, -0.25, 0.91]}*/}
                {/*    scale={[0.51, 0.51, 0.51]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[-0.19, 0.33, 0.25]}*/}
                {/*    rotation={[0.86, -0.6, 0.4]}*/}
                {/*    scale={[0.51, 0.51, 0.51]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[-0.1, 0.32, 0.31]}*/}
                {/*    rotation={[0.74, -0.3, 0.31]}*/}
                {/*    scale={[0.51, 0.51, 0.51]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.05, 0.45, 0.06]}*/}
                {/*    rotation={[0.08, -0.3, -0.12]}*/}
                {/*    scale={[0.51, 0.51, 0.51]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.03, 0.45, -0.06]}*/}
                {/*    rotation={[-3.13, -0.84, -2.97]}*/}
                {/*    scale={0.51}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.11, 0.44, -0.02]}*/}
                {/*    rotation={[2.51, 0.92, -2.53]}*/}
                {/*    scale={[0.51, 0.51, 0.51]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.45, -0.01, 0.09]}*/}
                {/*    rotation={[1.6, -0.11, -1.45]}*/}
                {/*    scale={[0.62, 0.62, 0.62]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.06, -0.01, 0.45]}*/}
                {/*    rotation={[1.67, -0.13, -0.12]}*/}
                {/*    scale={[0.49, 0.49, 0.49]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.26, -0.13, 0.34]}*/}
                {/*    rotation={[1.84, -0.19, -0.62]}*/}
                {/*    scale={[0.49, 0.49, 0.49]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[-0.32, 0.23, -0.22]}*/}
                {/*    rotation={[2.14, -0.25, 2.4]}*/}
                {/*    scale={[0.51, 0.51, 0.51]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[-0.36, 0.25, -0.11]}*/}
                {/*    rotation={[1.65, -0.63, 1.94]}*/}
                {/*    scale={[0.51, 0.51, 0.51]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[0.1, 0.24, -0.37]}*/}
                {/*    rotation={[2.19, 0.11, -2.81]}*/}
                {/*    scale={[0.62, 0.62, 0.62]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[-0.19, -0.07, -0.41]}*/}
                {/*    rotation={[1.5, 0.12, 2.78]}*/}
                {/*    scale={[0.52, 0.52, 0.52]}*/}
                {/*/>*/}
                {/*<mesh*/}


                {/*    geometry={leafGeometry}*/}
                {/*    material={leafMaterial}*/}
                {/*    position={[-0.28, -0.05, -0.35]}*/}
                {/*    rotation={[1.21, -0.32, 2.48]}*/}
                {/*    scale={[0.52, 0.52, 0.52]}*/}
                {/*/>*/}
            </mesh>
        </group>
    );
}

useGLTF.preload("max-project/tree.glb");
useGLTF.preload(modelUrl);

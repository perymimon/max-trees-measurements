import React, {useRef} from "react";
import {useGLTF, Text, shaderMaterial} from "@react-three/drei";
import {domain2range, findMinMax2D} from "../helper/math";
import {Color} from "three";

import basicVertex from "/src/shaders/basicVertex.glsl?raw";
import foliageFragment from "/src/shaders/basicVertex.glsl?raw";


let modelURL = new URL('../../3d-models/treeModel.glb', import.meta.url);

// const foliageMaterial = new ShaderMaterial({
//     vertexShader: basicVertex,
//     fragmentShader: foliageFragment,
//     // wireframe:true,
//     transparent: true,
//     uniforms: {
//         uTime:{value:0},
//         uColorTop:{value:new Color('orange')},
//         uColorBottom:{value:new Color('green')},
//     }
// })
// debugger;

const FoliageMaterial = shaderMaterial(
    {
        uColorTop: new Color(0.2, 0.0, 0.1),
        uColorBottom: new Color(0.2, 0.0, 0.1)
    },
    // vertex shader
    basicVertex,
    foliageFragment
)

export function Trees(props) {
    const {tops, bottoms, watered} = props;
    const treeModel = useGLTF(modelURL.href);
    const topmm = findMinMax2D(tops);
    const bottomsmm = findMinMax2D(bottoms);
    const weteredmm = findMinMax2D(watered);
    const treeHeightScale = domain2range(weteredmm, [0.5, 2]);

    return tops.map((row, z, rows) => {
        return row.map((number, x, columns) => {
            let tx = x - ((columns.length - 1) / 2)
            let tz = z - ((rows.length - 1) / 2)
            let key = `${tx}${tz}`
            let topDensity = tops[z][x]
            let bottomDensity = bottoms[z][x]
            let water = watered[z][x]

            return <Tree key={key} treeModel={treeModel}
                         position={[tx, -3, tz]}
                         topDensity={topDensity}
                         bottomDensity={bottomDensity}
                         water={water}
                         heightScale={treeHeightScale(water)}
            />
        })
    })
}

export default function Tree(props) {
    const {treeModel, heightScale = 1, topDensity, bottomDensity, water} = props;
    const {nodes, materials} = treeModel;
    const group = useRef();

    let densityColor = `hsl(${360 * topDensity / 500}, 100%, 50%)`;
    const leafGeometry = nodes.Plane283.geometry
    const leafMaterial = nodes.Plane283.material

    return (
        <group ref={group} {...props} dispose={null}>
            {/*<group*/}
            {/*    position={[0, 2, 0]}*/}
            {/*    rotation-x={-.9}*/}
            {/*>*/}
            {/*    /!*<mesh name="Tree" scale={.5}>*!/*/}
            {/*    /!*    <planeGeometry args={[1, 1]}/>*!/*/}
            {/*    /!*    <meshBasicMaterial color={densityColor} transparent/>*!/*/}
            {/*    /!*</mesh>*!/*/}
            {/*    /!*<Text color="black" anchorX="center" anchorY="middle" position={[0, 0, 0.1]}>*!/*/}
            {/*    /!*    {density}*!/*/}
            {/*    /!*</Text>*!/*/}
            {/*</group>*/}
            <mesh name="breed" castShadow
                  geometry={nodes.Circle025.geometry}
                  material={materials.Wood}
                  rotation={[-Math.PI, -0.19, -Math.PI]}
                  scale={[1, heightScale, 1]}
            />
            <mesh name="foliage" castShadow
                  geometry={nodes.Roundcube028.geometry}
                  position={[0, heightScale * 0.85, 0]}
            >
                <FoliageMaterial attach="material" color="hotpink" time={1}/>
                {/*<meshBasicMaterial color={densityColor} fog={true}/>*/}
                {/*<meshBasicMaterial toneMapped={false} fog={false} />*/}
                <mesh
                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.16, 0.28, 0.32]}
                    rotation={[0.89, -0.16, -0.33]}
                    scale={0.62}
                />
                <mesh
                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.26, 0.26, 0.27]}
                    rotation={[1.41, 0.6, -0.71]}
                    scale={0.62}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.32, 0.32, -0.07]}
                    rotation={[1.9, 0.59, -1.86]}
                    scale={[0.62, 0.62, 0.62]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[-0.25, 0.06, 0.37]}
                    rotation={[1.54, -0.13, 0.64]}
                    scale={0.62}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[-0.34, 0.1, 0.28]}
                    rotation={[1.42, -0.25, 0.91]}
                    scale={[0.51, 0.51, 0.51]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[-0.19, 0.33, 0.25]}
                    rotation={[0.86, -0.6, 0.4]}
                    scale={[0.51, 0.51, 0.51]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[-0.1, 0.32, 0.31]}
                    rotation={[0.74, -0.3, 0.31]}
                    scale={[0.51, 0.51, 0.51]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.05, 0.45, 0.06]}
                    rotation={[0.08, -0.3, -0.12]}
                    scale={[0.51, 0.51, 0.51]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.03, 0.45, -0.06]}
                    rotation={[-3.13, -0.84, -2.97]}
                    scale={0.51}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.11, 0.44, -0.02]}
                    rotation={[2.51, 0.92, -2.53]}
                    scale={[0.51, 0.51, 0.51]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.45, -0.01, 0.09]}
                    rotation={[1.6, -0.11, -1.45]}
                    scale={[0.62, 0.62, 0.62]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.06, -0.01, 0.45]}
                    rotation={[1.67, -0.13, -0.12]}
                    scale={[0.49, 0.49, 0.49]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.26, -0.13, 0.34]}
                    rotation={[1.84, -0.19, -0.62]}
                    scale={[0.49, 0.49, 0.49]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[-0.32, 0.23, -0.22]}
                    rotation={[2.14, -0.25, 2.4]}
                    scale={[0.51, 0.51, 0.51]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[-0.36, 0.25, -0.11]}
                    rotation={[1.65, -0.63, 1.94]}
                    scale={[0.51, 0.51, 0.51]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[0.1, 0.24, -0.37]}
                    rotation={[2.19, 0.11, -2.81]}
                    scale={[0.62, 0.62, 0.62]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[-0.19, -0.07, -0.41]}
                    rotation={[1.5, 0.12, 2.78]}
                    scale={[0.52, 0.52, 0.52]}
                />
                <mesh


                    geometry={leafGeometry}
                    material={leafMaterial}
                    position={[-0.28, -0.05, -0.35]}
                    rotation={[1.21, -0.32, 2.48]}
                    scale={[0.52, 0.52, 0.52]}
                />
            </mesh>
        </group>
    );
}

// useGLTF.preload("max-project/tree.glb");
useGLTF.preload(modelURL.href);

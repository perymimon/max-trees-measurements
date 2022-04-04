import {memo, useDeferredValue, useEffect, useTransition} from "react";
import {useGLTF, Text,Plane} from "@react-three/drei";
import {domain2range, lerpKey} from "/src/helper/math";

import {
    CanvasTexture, MeshBasicMaterial, NearestFilter, sRGBEncoding
} from "three";

import LetMap from "/src/helper/let-map";
import useRefs from 'react-use-refs'

import {useFrame, useThree} from "@react-three/fiber";
import {useSnapshot} from "valtio";
import state from "/src/state";

const modelUrl = './3d-models/treeModel-leafsMerge.glb'

const colorByDensity = domain2range([0, 500], [20, 100]);
const heighByWater = domain2range([0, 4], [0.5, 2]);

const letCanvas = new LetMap((i) => {
    let canvas = document.createElement('canvas')
    // document.getElementById('canvas-container').append(canvas)
    let ctx = canvas.getContext('2d')
    let texture = new CanvasTexture(canvas)

    canvas.width = 10;
    canvas.height = 20;

    texture.magFilter = NearestFilter
    texture.encoding = sRGBEncoding
    texture.flipY = false

    return {canvas, ctx, texture}
});


export const Trees = memo(TreesComponent)

function TreesComponent(props) {
    console.log('rendering trees')
    const snap = useSnapshot(state)

    return snap.dayInfo.datums.map((data, index) => {
        const {x, y} = snap.board.xy(index)

        return <Tree key={index} data={data} position={[x, -1.6, y]}/>
    })

}

function Tree({position, data}) {
    const [bread, foliage] = useRefs();
    const dfrDensities = useDeferredValue(data.densities)

    const {nodes, materials} = useGLTF(modelUrl)

    const {canvas, ctx, texture} = letCanvas.let(data.index)
    const {invalidate} = useThree()

    const [isPending, startTransition] = useTransition();

    useEffect(_ => void invalidate(), [data.densities, data.watered])

    useEffect(_ => {
        // let mat = Object.create(foliage.current.material)
        // mat.map = texture;
        // mat.toneMapped = false
        let mat = new MeshBasicMaterial({map: texture, toneMapped: false})
        let foliageMesh = foliage.current
        foliageMesh.material = mat;
    }, [])

    useFrame((treeState, dt) => {
            const needsUpdate = []
            const height = heighByWater(data.watered)
            // height
            needsUpdate[0] = lerpKey(bread.current.scale, 'y', height, 0.06)
            needsUpdate[1] = lerpKey(foliage.current.position, 'y', height, 0.06)
            // foliage color

            if (needsUpdate.reduce((c, n) => c || n, false)) {
                invalidate()
            }
    })

    useEffect(_=>{
        startTransition( _=>{
            let [top, bottom] = data.densities;

            ctx.fillStyle = `hsl(79deg ${colorByDensity(top)}% 50%)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
            ctx.fillStyle = `hsl(79deg ${colorByDensity(bottom)}% 50%)`;
            ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height);

            foliage.current.material.map.needsUpdate = true;
        })
    }, [...dfrDensities])


    return (
        <group position={position} dispose={null}>
            <Plane args={[.3, .5]} position={[-.3,.2,0]} rotation={[-.3,0,0]}>
                <meshBasicMaterial color="purple"/>
                <Text scale={2} position={[0,0.1,0.1]} >
                    <meshBasicMaterial color="yellow"/>
                    {data.index}
                </Text>
            </Plane>

            <mesh ref={bread}
                  geometry={nodes.tree.geometry}
                  material={materials.Wood}
                  rotation={[-Math.PI, -0.2, -Math.PI]}
            />
            <mesh ref={foliage}
                  geometry={nodes.foliage.geometry}
                  material={materials.Grass}
                  position={[0, 1.1, 0]}
            >
                <mesh
                    geometry={nodes.leaf.geometry}
                    material={materials["Grass.001"]}
                    position={[-0.28, -0.1, -0.4]}
                    rotation={[1.2, -0.3, 2.5]}
                    scale={0.53}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload(modelUrl);

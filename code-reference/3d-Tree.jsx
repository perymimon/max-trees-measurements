import {useEffect, useState} from "react";
import {useGLTF, Text} from "@react-three/drei";
import {domain2range} from "/CODE/projects/max-trees-mesurments/src/helper/math";
import {usePrevious} from "/CODE/projects/max-trees-mesurments/src/helper/anime-manager";

import {
    CanvasTexture,
    NearestFilter,
    sRGBEncoding
} from "three";

import LetMap from "/CODE/projects/max-trees-mesurments/src/helper/let-map";
import useRefs from 'react-use-refs'

import {useFrame} from "@react-three/fiber";
import {useSnapshot} from "valtio";
import state from "/CODE/projects/max-trees-mesurments/src/state";
import {lerp} from "three/src/math/MathUtils";

const modelUrl = './3d-models/treeModel-leaf.glb'

const densityToColor = domain2range([0, 500], [20, 100]);
const waterToHeight = domain2range([0, 4], [0.5, 2]);

const letCanvas = new LetMap((i) => {
    let ctx = document.createElement('canvas').getContext('2d')
    ctx.canvas.width = 1;
    ctx.canvas.height = 2;
    return ctx.canvas
});

export function Trees(props) {
    console.log('rendering trees')
    const snap = useSnapshot(state)

    return snap.dayInfo.datums.map((data, index) => {
        const {x, y} = snap.board.xy(index)
        data.densities // for some reason, this is necessary to make trees reRenders
        return <Tree key={index}
                     position={[x, -2, y]}
                     data={data}
                     index={index}
        />

    })
}

export default function Tree(props) {
    const {index} = props;
    const {densities, watered} = props.data;
    const {nodes, materials} = useGLTF(modelUrl);
    const [group, bread, foliage] = useRefs()

    const heightScale = waterToHeight(watered)
    const densitiesState = usePrevious(densities, [])
    const canvas = letCanvas.let(index)

    const grassMaterial = useState(_ => {
        let mat = Object.create(materials["Grass.001"])
        mat.map = new CanvasTexture(canvas)
        return mat;
    })


    // useEffect(() => {
    //     const texture = foliage.current.material.map;
    //     texture.magFilter = NearestFilter
    //     texture.encoding = sRGBEncoding
    //     texture.flipY = false
    // }, [])

    useFrame((treeState, dt) => {
        let breadScale = bread.current.scale;
        let foliagePosition = foliage.current.position;
        breadScale.y = lerp(breadScale.y, heightScale, 0.06)
        foliagePosition.y = lerp(foliagePosition.y, heightScale + .04, 0.06)

        // update canvas and color
        if (densitiesState.join(',') !== densities.join(',')) {
            let ctx = canvas.getContext('2d')
            let [topDensity, bottomDensity] = densities;

            ctx.fillStyle = `hsl(79deg ${densityToColor(topDensity)}% 50%)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
            ctx.fillStyle = `hsl(79deg ${densityToColor(bottomDensity)}% 50%)`;
            ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height);

            foliage.current.material.map.needsUpdate = true;
        }
    })


    return (
        <group
            visible={true}
            name={"tree-" + index} ref={group} {...props} dispose={null} raycast={() => null}>
            <Text position={[0, .5, 0]}
                  rotation={[Math.PI / 2, Math.PI, 0]}
                  fontSize={.4}>{index}</Text>

            <mesh name="breed"
                  ref={bread}
                  geometry={nodes.Circle025.geometry}
                  material={materials.Wood}
                  rotation={[-Math.PI, -0.19, -Math.PI]}

            />
            <mesh name="foliage"
                  ref={foliage}
                  visible={true}
                  geometry={nodes.Roundcube028.geometry}
                  material={materials["Grass"]}
            >
            </mesh>
        </group>
    );
}

useGLTF.preload("max-project/tree.glb");
useGLTF.preload(modelUrl);

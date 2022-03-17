import {BoxGeometry, Color, MeshStandardMaterial, Object3D} from "three";
import {domain2range} from "../helper/math";
import {useEffect, useRef} from "react";
import {useSnapshot} from "valtio";
import proxyState from "/src/state";


const normalWater = domain2range([0, 5], [0.2, 1]);

const waterColor = (density) => {
    const color = new Color();
    color.setHSL(225 / 360, normalWater(density), 0.5);
    return color;
}

const waterGeometry = new BoxGeometry(1, 1, 1)
waterGeometry.name = "waterGeometry"

const waterMaterial = new MeshStandardMaterial({
    name: 'waterMaterial', color: waterColor(0)
})

const temp = new Object3D()

export function Grounds({size =1}) {
    const snap = useSnapshot(proxyState)
    const board = snap.board;
    const {datums} = snap.dayInfo;

    const ref = useRef()

    useEffect(_ => {
        for (let i = 0; i < board.len; i++) {
            let {watered} = datums[i]
            let {x,y} = board.xy(i)

            temp.position.set( x, -2.01, y)
            temp.scale.set(size, size, size)
            temp.updateMatrix()
            ref.current.setMatrixAt(i, temp.matrix)
            ref.current.setColorAt(i, waterColor(watered))
        }
        // Update the instance
        ref.current.instanceMatrix.needsUpdate = true
        ref.current.instanceColor.needsUpdate = true;

    }, [])

    return (
        <instancedMesh ref={ref} args={[waterGeometry, waterMaterial, board.len]}/>
    )

}

export default Grounds
import {BoxGeometry, Color, MeshStandardMaterial, Object3D} from "three";
import {domain2range} from "../helper/math";
import {useEffect, useRef} from "react";
import LetMap from "../helper/let-map";

const normalWater = domain2range([0, 5], [0.2, 1]);

const waterColor = (density) => {
    const color = new Color();
    color.setHSL(225 / 360, normalWater(density), 0.5);
    return color;
}

// const waterMaterials = new LetMap(index => {
//     return  new MeshStandardMaterial({
//         name: "waterMaterial-" + index, color: waterColor(index)
//     })
// })

const waterGeometry = new BoxGeometry(1, 1, 1)
waterGeometry.name = "waterGeometry"

const waterMaterial = new MeshStandardMaterial({
    name: 'waterMaterial', color: waterColor(0)
})

const temp = new Object3D()

export function Grounds(props) {
    const {columns, rows, size = 1, datums} = props;
    const ref = useRef()

    let cx = ((columns - 1) / 2)
    let cz = ((rows - 1) / 2)
    const count = columns * rows

    useEffect(_ => {
        for (let index = 0; index < count; index++) {
            let {densities, watered} = datums[index]
            let x = index % columns
            let z = Math.floor(index / columns)

            temp.position.set(cx - x, -2, cz - z)
            temp.scale.set(size, size, size)
            temp.updateMatrix()
            ref.current.setMatrixAt(index, temp.matrix)
            ref.current.setColorAt(index, waterColor(watered))
        }
        // Update the instance
        ref.current.instanceMatrix.needsUpdate = true
        ref.current.instanceColor.needsUpdate = true;

    }, [])

    return (
        <instancedMesh ref={ref} args={[waterGeometry, waterMaterial, count]}/>
    )

}

export default Grounds
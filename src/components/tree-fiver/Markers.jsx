import {BoxGeometry, MeshStandardMaterial} from "three";
import {Text} from "@react-three/drei";
import React, {useRef} from "react";

const boxMaterial = new MeshStandardMaterial({color: 'white'});
const boxMaterialOver = new MeshStandardMaterial({color: 'black'});
const textColor = 'black'
const textColorOver = 'white'

const size = 0.9;
const boxGeometry = new BoxGeometry(size, size, size);

function Box({position, onOver, onOut, text}) {

    function handleHovered(event) {
        hover(true)
        onOver && onOver(event);
    }

    function handleOut(event) {
        hover(false)
        onOut && onOut(event);
    }

    let [hovered, hover] = React.useState(null);
    const [tc, bm] = hovered ?
        [textColorOver, boxMaterialOver] :
        [textColor, boxMaterial];

    return <group position={position}
                  onPointerOver={handleHovered}
                  onPointerOut={handleOut}
    >
        <Text position={[0, 0, -size / 2 - 0.01]}
              color={tc}
              rotation={[0, Math.PI, 0]}
              fontSize={.6}>{text}</Text>

        <Text position={[0, size / 2 + 0.01, 0]}
              color={tc}
              rotation={[Math.PI / 2, Math.PI, 0]}
              fontSize={.6}>{text}</Text>

        <Text position={[0,0 , size / 2 + 0.01]}
              color={tc}
              rotation={[0,0, 0]}
              fontSize={.6}>{text}</Text>

        <mesh geometry={boxGeometry} material={bm}/>
    </group>
}

export function Markers(props) {
    let {length, gap = 1, onOver, size = 0.9} = props;
    let count = length / gap;
    let markers = useRef(new Set());

    function handleMouse(index, added) {
        if(added) {
            markers.current.add(index);
        } else {
            markers.current.delete(index);
        }
        // console.log('marker', markers);
        onOver && onOver(markers.current);
    }

    return <group {...props}>
        <group position={[-(length - 1) / 2, 0, 0]}
        >
            {Array.from({length: count}, (_, index) => {
                return <Box key={index}
                            text={(index + 1) * gap}
                            onOver={_=>handleMouse(index, true)}
                            onOut={_=>handleMouse(index, false)}
                            position={[index * gap, 0, 0]}/>
            })}
        </group>
    </group>
}

export default Markers;
import {Color, BoxGeometry, MeshBasicMaterial, MeshStandardMaterial} from "three";
import {Text} from "@react-three/drei";
import {forwardRef, useRef, useState} from "react";
import LetMap from "../../helper/let-map";
import useRefs from 'react-use-refs'
import {useFrame} from "@react-three/fiber";


const whiteMaterial = new MeshStandardMaterial({name: 'rollerMaterial', color: 'white'});
const blackMaterial = new MeshBasicMaterial({name: 'textMaterial', color: 'black'});

const size = 0.9;
const rollerGeometry = new BoxGeometry(size, size, size);
rollerGeometry.name = 'rollerGeometry';

const texts = new LetMap(text => {
    return (
        <Text name={`text-${text}`}
              material={textMaterial}
              fontSize={.6}>{text}</Text>
    )
});
const MyText = forwardRef((props, ref) => {
    const {text, ...restProps} = props;
    const textMesh = texts.let(text);
    return (
        <group {...restProps} >
            <primitive object={textMesh} ref={ref}/>
        </group>
    )
});


function Box({position, onOver, onOut, text}) {
    const [txt1, txt2, txt3, box] = useRefs()
    let [hovered, hover] = useState(null);

    function handleHovered(event) {
        event.stopPropagation();
        hover(true)
        onOver && onOver(event);
    }

    function handleOut(event) {
        hover(false)
        onOut && onOut(event);
    }
    useFrame(() => {
        if(hovered){
            box.current.material = blackMaterial;
            txt1.current.material = whiteMaterial;
            txt2.current.material = whiteMaterial;
            txt3.current.material = whiteMaterial;
        }else{
            box.current.material = whiteMaterial;
            txt1.current.material = blackMaterial;
            txt2.current.material = blackMaterial;
            txt3.current.material = blackMaterial;
        }

    })


    return <group position={position} onPointerOver={handleHovered} onPointerOut={handleOut}>
        <Text ref={txt1} text={text}

              position={[0, 0, -size / 2 - 0.01]}
              rotation={[0, Math.PI, 0]}
              fontSize={.6}>{text}</Text>

        <Text ref={txt2} text={text}

              position={[0, size / 2 + 0.01, 0]}
              rotation={[Math.PI / 2, Math.PI, 0]}
              fontSize={.6}>{text}</Text>

        <Text ref={txt3} text={text}

              position={[0, 0, size / 2 + 0.01]}
              rotation={[0, 0, 0]}
              fontSize={.6}>{text}</Text>

        <mesh ref={box} geometry={rollerGeometry}/>
    </group>
}

export function Ruler(props) {
    let {length, gap = 1, onOver, size = 0.9} = props;
    let count = length / gap;
    let markers = useRef(new Set());

    function handleMouse(index, added) {
        if (added) {
            markers.current.add(index);
        } else {
            markers.current.delete(index);
        }
        onOver?.(markers.current);
    }

    return <group {...props}>
        <group position={[(length - 1) / 2, 0, 0]}>
            {Array.from({length: count}, (_, index) => {
                return <Box key={index}
                            text={(index + 1) * gap}
                            onOver={_ => handleMouse(index, true)}
                            onOut={_ => handleMouse(index, false)}
                            position={[-index * gap, 0, 0]}/>
            })}
        </group>
    </group>
}

export default Ruler;
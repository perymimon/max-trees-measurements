import {BoxGeometry, MeshBasicMaterial, MeshStandardMaterial} from "three";
import {memo, Suspense, useLayoutEffect, useMemo, useRef, useState} from "react";
import useRefs from 'react-use-refs'
import {Text} from "@react-three/drei";
import {useResource} from "../../helper/miniHooks";

// material-toneMapped={false}
const whiteMaterial = new MeshStandardMaterial({name: 'rollerMaterial', color: 'white'});
const blackMaterial = new MeshBasicMaterial({name: 'textMaterial', color: 'black'});

const size = 0.9;
const rollerGeometry = new BoxGeometry(size, size, size);
rollerGeometry.name = 'rollerGeometry';

const Box = memo(BoxComponent)

function BoxComponent({position, onOver, onOut, text}) {
    const [txt1, txt2, txt3, box] = useRefs()
    let [hovered, hover] = useState(false);

    function handleHovered(event) {
        event.stopPropagation();
        hover(true)
        onOver && onOver(event);
    }

    function handleOut(event) {
        hover(false)
        onOut && onOut(event);
    }

    const [textMat, cubeMat] = useMemo(_ =>
            (hovered) ? [blackMaterial, whiteMaterial] : [whiteMaterial, blackMaterial]
        , [hovered])


    const [$textRef, $text] = useResource()

    return <group position={position}
                  onPointerOver={handleHovered}
                  onPointerOut={handleOut}
    >
        <Suspense fallback={"Loading ..."}>
            <Text
                ref={$textRef}
                position={[0, 0, -size / 2 - 0.01]}
                rotation={[0, Math.PI, 0]}
                depthTest={false}
                material={textMat}
                material-toneMapped={false}
                fontSize={.6}>{text}</Text>
            <Text
                ref={$textRef}
                position={[0, size / 2 + 0.01, 0]}
                rotation={[Math.PI / 2, Math.PI, 0]}
                depthTest={false}
                material={textMat}
                material-toneMapped={false}
                fontSize={.6}>{text}</Text>
            <Text
                ref={$textRef}
                position={[0, 0, size / 2 + 0.01]}
                rotation={[0, 0, 0]}
                depthTest={false}
                material={textMat}
                material-toneMapped={false}
                fontSize={.6}>{text}</Text>
            <Text
                ref={$textRef}
                position={[0, 0, size / 2 + 0.01]}
                rotation={[0, 0, 0]}
                depthTest={false}
                material={textMat}
                material-toneMapped={false}
                fontSize={.6}>{text}</Text>

        </Suspense>
        <mesh ref={box} geometry={rollerGeometry} material={cubeMat}/>
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

    return (
        <group {...props}>
            <group position={[(length - 1) / 2, 0, 0]}>
                {Array(count).fill().map((_, index) => (
                    <Box key={index}
                         text={(index + 1) * gap}
                         onOver={_ => handleMouse(index, true)}
                         onOut={_ => handleMouse(index, false)}
                         position={[-index * gap, 0, 0]}/>
                ))}
            </group>
        </group>
    )
}

export default Ruler;
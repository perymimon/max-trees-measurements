import {useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {useScroll,  Html} from '@react-three/drei'

import './MiniMap.css'

let pageIndex = -1;

export function Minimap({items, onPageChange = null}) {
    const ref = useRef()
    const scroll = useScroll()
    // console.log('scroll', scroll);

    useFrame((state, delta) => {
        // fire event when page changes
        const page = Math.floor(scroll.offset * scroll.pages)
        if(page !== pageIndex) {
            pageIndex = page
            if(onPageChange) {
                onPageChange(page)
            }
        }
        // update the scaleY of each Line
        for (let child of ref.current.children) {
            let index = +child.dataset.index
            // Give me a value between 0 and 1
            //   starting at the position of my item
            // in the edges it will be 0 but with marging of x * units
            var unit = 1 / items.length;
            var center = index * unit
            var margin = 1.5 * unit
            const y = scroll.curve(center,  unit,  margin )
            child.style.setProperty('--scaleY', 0.5 + y)
        }
    })

    return (
        <Html ref={ref}
              className="minimap"
              calculatePosition={(el, camera, size)=>[size.width/2, 50]} >
            {items.map((dayText, i) => {
                return <div key={i} data-index={i} className="line" >
                    {dayText}
                </div>
            })}

        </Html>
    )
}

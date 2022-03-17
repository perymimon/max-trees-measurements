import {useEffect, useRef} from 'react'
import {useScroll, Html} from '@react-three/drei'

import './MiniMap.css'
import {useFrame, useThree} from "@react-three/fiber";
import {clamp} from "../../helper/math";

let pageIndex = -1;

export function Minimap(props) {
    const {items, onPageChange = null,onPageMove = null} = props;
    const ref = useRef()
    const scroll = useScroll()
    const {size} = useThree()

    useEffect(() => {
        scroll.el.addEventListener('scroll', (event) => {
            const t = event.target;
            const current = t.scrollTop / (t.scrollHeight - t.clientHeight);
            // const current = (scroll.scroll.current ?? 0)
            const page = clamp(current * (scroll.pages -1), 0);
            const pageStart = Math.floor(page);
            const pageEnd = Math.ceil(page);
            const weight = page - pageStart;

            // fire event when page changes
            const customEvent = {page, pageStart, pageEnd, weight};
            onPageMove?.(customEvent)
            if (pageStart !== pageIndex) {
                pageIndex = pageStart
                onPageChange?.(customEvent)
            }
        }, {passive: true})
    }, [])

    useFrame(event => {
        // update the scale of each item
        for (let child of ref.current.children) {
            let index = +child.dataset.index
            // curve give me a values of  0 edges and 1 in the middle
            var unit = 1 / items.length;
            var margin = 0 * unit
            var from = index * unit - (.5 * unit + margin)
            const y = scroll.curve(from, 2 * unit, margin)
            child.style.setProperty('--scaleY', 0.5 + y)
        }
    })

    function moveToPage(index, event) {
        let {el, horizontal, pages} = scroll
        const containerLength = size[horizontal ? 'width' : 'height'];
        const scrollLength = el[horizontal ? 'scrollWidth' : 'scrollHeight'];
        const pageLen = (scrollLength - containerLength) / pages;

        scroll.el.scrollTo({
            top: (index) * pageLen,
            // behavior: 'smooth'
        })
    }

    return (

        <Html ref={ref}
              className="minimap"
              calculatePosition={(el, camera, size) => [size.width / 2, 50]}>
            {items.map((dayText, i) => {
                return <div key={i}
                            onClick={event => moveToPage(i, event)}
                            data-index={i} className="line">
                    {dayText}
                </div>
            })}

        </Html>
    )
}

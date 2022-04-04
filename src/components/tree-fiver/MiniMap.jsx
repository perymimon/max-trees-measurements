import { memo, useRef} from 'react'
import { Html} from '@react-three/drei'
import './MiniMap.css'

export const Minimap = memo(MinimapComponent)

function MinimapComponent(props) {
    const {items, index, onPageChange = null} = props;
    const html = useRef()

    function handleOnPageChange(index) {
        onPageChange?.(index)
    }


    return (<Html ref={html}
                  className="minimap"
                  calculatePosition={(el, camera, size) => [0, 50]}>
        {items.map((dayText, i) => {
            let size = (i === index) ? 1 : 0.5;
            let style = {'--scaleY': size}
            return <div key={i}
                        style={style}
                        onClick={event => handleOnPageChange(i)}
                        className="line">
                {dayText}
            </div>
        })}

    </Html>)


}

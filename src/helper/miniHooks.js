import {useLayoutEffect, useRef, useState} from "react";

export function useResource(optionalRef) {
    const [_, forceUpdate] = useState(false)
    const localRef = useRef()
    const ref = optionalRef ? optionalRef : localRef
    useLayoutEffect(() => void forceUpdate((i) => !i), [ref.current])
    return [ref, ref.current]
}
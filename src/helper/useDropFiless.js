import {useEffect, useRef, useState} from "react";

function async(obj, eventName) {
    return new Promise((res, rej) => {
        obj.addEventListener(eventName, res);
    });
}

async function dropRefHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    let files = e.dataTransfer.files
    let reader = new FileReader()
    let filesReturn = []

    for (let file of files) {
        reader.readAsText(file)
        await async(reader, 'load')
        filesReturn.push({
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result
        })
    }

    return filesReturn


}

export function useDropFiless(ref, onFileDrop) {
    const [files, setFiles] = useState({})
    useEffect(() => {
        let dropRef = ref.current
        if (!dropRef) return

        dropRef.addEventListener('dragenter', (e) => {
            e.preventDefault()
            e.stopPropagation()
            dropRef.classList.add('drag-enter')
        })
        dropRef.addEventListener('dragleave', (e) => {
            e.preventDefault()
            e.stopPropagation()
            dropRef.classList.remove('drag-enter')
        })
        dropRef.addEventListener('dragover', (e) => {
            e.preventDefault()
            e.stopPropagation()
        })
        dropRef.addEventListener('drop', async (e) => {
            e.preventDefault()
            e.stopPropagation()
            dropRef.classList.remove('drag-enter')
            let filesReturn = await dropRefHandler(e)
            // (
            // must assing to same object or use "useRef"
            // )

            setFiles({...Object.assign(files, filesReturn)})
        })
        return () => {
            dropRef.removeEventListener('dragenter', dropRefHandler)
            dropRef.removeEventListener('dragleave', dropRefHandler)
            dropRef.removeEventListener('dragover', dropRefHandler)
            dropRef.removeEventListener('drop', dropRefHandler)
        }
    }, [ref.current])

    return [files,function clear(){
      setFiles({})
    }]
}
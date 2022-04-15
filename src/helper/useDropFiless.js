import {useEffect, useRef, useState} from "react";


async function dropRefHandler(e) {
    e.preventDefault()
    e.stopPropagation()
    let filesReturn = {};
    let files = e.dataTransfer.files

    for (let file of files) {
        filesReturn[file.name] = file
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

    return [files, function clear(deletingFiles) {
        if (!files) return setFiles({}), false;
        for(let f of deletingFiles){
            delete files[f.name]
        }
        setFiles({...files})

    }]
}
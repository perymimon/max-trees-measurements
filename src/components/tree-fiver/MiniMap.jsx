import {memo, useMemo, useRef} from 'react'
import {Html} from '@react-three/drei'
import './MiniMap.css'
import {useDropFiless} from "../../helper/useDropFiless";

export const Minimap = memo(MinimapComponent)

function MinimapComponent(props) {
    const {items, index, onSelect = null, onFileDrop = null} = props;
    const targetRef = useRef();
    const [files, clear] = useDropFiless(targetRef);

    let filesByDates = useMemo(_ => {
        let filesByDate = {};
        let dateCheck = /\d\d-\d\d-\d\d/
        for (let fileName in files) {
            let date = fileName.match(dateCheck)
            let group = filesByDate[date] = filesByDate[date] || {
                date: date + '',
                files: [],
                complete: false
            }
            group.files.push(files[fileName])
            if (group.files.length === 3)
                group.complete = true;
        }
        return filesByDate;

    }, [files])

    function handleApplyFiles(group) {
        let applyFiles = {}
        for(let file of group.files){
            let dateClean = /watered|flowering_bot|flowering_top/
            applyFiles[file.name.match(dateClean)] = file.data
        }
        onFileDrop?.(applyFiles)
    }

    return (
        <div className="minimap" ref={targetRef}>
            {items.map((dayText, i) => {
                let size = (i === index) ? 1 : 0.5;
                let style = {'--scaleY': size}
                return <div key={i}
                            style={style}
                            onClick={event => onSelect?.(i)}
                            className="page">
                    {dayText}
                </div>
            })}
            {Object.values(filesByDates).map(group => {
                return (
                    <div key={group.name}
                         className={`files-pending ${group.complete && "group-complete"}`}>
                        {
                            group.files.map(file => (
                                <div className="file" key={file.name}>
                                    <div>{file.name}</div>
                                </div>
                            ))
                        }
                        {group.complete && <button onClick={evt=>handleApplyFiles(group)}>Apply</button>}
                    </div>

                )
            })}


        </div>
    )


}

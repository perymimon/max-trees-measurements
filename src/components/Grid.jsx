import "./grid.css";
import React from "react";

export function Grid(props) {
    const {datums, columns, weight, rows, dayStart, dayEnd, focus} = props;
    const {onMouseOver, onMouseOut, onClick} = props;


    const style = {
        "--grid-columns": columns,
        "--grid-rows": rows,
    }
    return (
        <div className="grid" style={style}>
            <header>start: {dayStart} end: {dayEnd} rows: {rows} columns: {columns} weight: {weight}</header>
            {datums.map((cell, index) => {
                let focusClass = focus === index ? "focus" : "";
                return <div key={index}
                            onMouseOver={() => onMouseOver?.(index)}
                            onMouseOut={() => onMouseOut?.(index)}
                            onClick={() => onClick?.(index)}
                            className={`grid-cell ${focusClass}`}>
                    t: {cell.top} <br/>
                    b: {cell.bottom} <br/>
                    w: {cell.watered} <br/>

                </div>
            })}
        </div>
    );
}

export default Grid;
import "./grid.css";
import React from "react";

export function Grid(props) {
    const {datums, columns, rows, onMouseOver, markeds = []} = props;

    const style ={
        "--grid-columns": columns,
        "--grid-rows": rows,
    }
    return (
        <div className="grid" style={style} >
            {datums.map((cell, index) => {
                const mark = markeds.includes(index) ? "marked" : "";
                return <div key={index}
                            onMouseOver={() => onMouseOver?.(index)}
                            className={`grid-cell ${mark}`}>
                    t: {cell.top} <br/>
                    b: {cell.bottom} <br/>
                    w: {cell.watered} <br/>

                </div>
            })}
        </div>
    );
}

export default Grid;
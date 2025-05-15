import React, { useState } from 'react';

export default function ImageGrid(props) {

    const [ grid, setGrid ] = useState(props.grid);

  return (
    <div className='grid grid-cols-64 w-[640px] h-[640px]' style={{
        gridTemplateColumns: `repeat(64, 10px)`,
      }}>
        {grid.flat().map((pixel, i) => {
            return <div key={i} className={`w-2.5 h-2.5`} style={{
                backgroundColor : `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`,
            }}></div>
        })}
    </div>
  )
}

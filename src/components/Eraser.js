import React from 'react'

function Eraser({ activeColor, setActiveColor }) {
  const color = "#fff"
  return (
    <label className="button-erasor">
      <input
        name="eraser"
        type="radio"
        value={color}
        checked={activeColor === color}
        onChange={() => setActiveColor(color)}
      />
      Eraser
    </label>
  )
}
export default Eraser

import React from 'react'

function WidthPicker({ width = [], activeWidth, activeColor, setActiveWidth }) {
  if (!width.length) return null
  return (
    <fieldset className="width-picker">
      {width.map((value, index) => (
        <label key={index}>
          <input
            name="width"
            type="radio"
            value={value}
            checked={activeWidth === width}
            onChange={() => setActiveWidth(value)}
          />
          <span style={{ backgroundColor: activeColor, width: value, height: value }} />
        </label>
      ))}
    </fieldset>
  )
}
export default WidthPicker

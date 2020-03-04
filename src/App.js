import React, { useState, useEffect, useCallback } from 'react'
import randomColor from 'randomcolor'

import Name from './components/Name'
import Canvas from './components/Canvas'
import ColorPicker from './components/ColorPicker'
import WidthPicker from './components/WidthPicker'
import Eraser from './components/Eraser'
import RefreshButton from './components/RefreshButton'

function App() {
  const [colors, setColors] = useState([])
  const [name, setName] = useState("")
  const [activeColor, setActiveColor] = useState(null)
  const getColors = useCallback(() => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
    .then(res => res.json())
    .then(res => {
      setColors(res.colors.map(color => color.hex.value))
      setActiveColor(res.colors[0].hex.value)
    })
  }, [])

  const width = [4, 6, 9, 12, 15]
  const [activeWidth, setActiveWidth] = useState(4)

  useEffect(getColors, [])

  return (
    <div className="app">
      <header style={{ borderTop: `10px solid ${activeColor}` }}>
        <div>
          <Name name={name} handleChange={setName}/>
        </div>
        <div style={{ marginTop: 10 }}>
            <div className="set-color">
              <ColorPicker
                colors={colors}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
              />
              <RefreshButton cb={getColors} activeColor={activeColor} />
            </div>
            <div className="set-width">
              <WidthPicker
                width={width}
                activeColor={activeColor}
                activeWidth={activeWidth}
                setActiveWidth={setActiveWidth}
              />
            </div>
            <Eraser
                activeColor={activeColor}
                setActiveColor={setActiveColor}
            />
        </div>
      </header>
      {activeColor && (
        <Canvas
          name={name}
          color={activeColor}
          penWidth={activeWidth}
        />
      )}
    </div>
  )
}
export default App
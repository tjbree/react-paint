import React, { useState, useEffect, useRef } from 'react'

export default function Canvas({ name, color, penWidth }) {
  const [drawing, setDrawing] = useState(false)
  const [cWidth] = useState(window.innerWidth)
  const [cHeight] = useState(window.innerHeight - 160)

  const canvasRef = useRef()
  const ctx = useRef()

  let steps = useRef(0)
  let points = useRef([])

  useEffect(() => {
    ctx.current = canvasRef.current.getContext('2d')
  }, [])

  function handleMouseMove(e) {
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ]
    if (drawing) {
      ctx.current.lineTo(...coords)
      ctx.current.stroke()
    }
  }

  function startDrawing(e) {
    ctx.current.lineJoin = 'round'
    ctx.current.lineCap = 'round'
    ctx.current.lineWidth = penWidth
    ctx.current.strokeStyle = color
    ctx.current.beginPath();
  
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    )
    setDrawing(true)
  }

  function stopDrawing(e) {
    ctx.current.closePath()
    setDrawing(false)
    steps.current ++
    points.current.push(canvasRef.current.toDataURL())
  }

  function undoDrawing() {
    clearCanvas()
    if (steps.current > 0) {
        steps.current --
        points.current.pop()
        let canvasPic = new Image();
        canvasPic.src = points.current[steps.current - 1];
        canvasPic.onload = function () {
          ctx.current.drawImage(canvasPic, 0, 0)
        }
    }
  }

  function clearCanvas() {
    ctx.current.clearRect(0, 0, cWidth, cHeight);
  }

  function download() {
    let image = canvasRef.current.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.download = name;
    link.href = image;
    link.click();
  }

  return (
    <div className="button-and-canvas">
      <div>
          <button onClick={() => undoDrawing()}>Undo</button>
          <button onClick={() => clearCanvas()}>Clear</button>
          <button onClick={() => download()}>Download</button>
      </div>
      <canvas
          ref={canvasRef}
          width={cWidth}
          height={cHeight}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={handleMouseMove}
      />
    </div>
  )
}

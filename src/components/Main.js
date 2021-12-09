import React, { useState, useEffect } from 'react'
import ReactGa from 'react-ga'
import '../css/main.css'

function Main() {
  // Drag
  const [dragging, setDragging] = useState(false)

  // Circle One
  const [topOne, setTopOne] = useState(0)
  const [leftOne, setLeftOne] = useState(0)
  const [diffOneX, setDiffOneX] = useState(0)
  const [diffOneY, setDiffOneY] = useState(0)

  // Circle One
  const [topTwo, setTopTwo] = useState(400)
  const [leftTwo, setLeftTwo] = useState(400)
  const [diffTwoX, setDiffTwoX] = useState(0)
  const [diffTwoY, setDiffTwoY] = useState(0)

  // Line
  const [lineWidth, setLineWidth] = useState(0)
  const [transform, setTransform] = useState(0)
  const [leftDiff, setLeftDiff] = useState(0)
  const [topDiff, setTopDiff] = useState(0)

  useEffect(() => {
    ReactGa.initialize('UA-62711254-5')
    ReactGa.pageview('/circles')
  }, [])

  useEffect(() => {
    // calculate: width and transform
    let ldiff = leftTwo - leftOne
    let tdiff = topTwo - topOne
    let width = Math.sqrt(Math.pow(ldiff, 2) + Math.pow(tdiff, 2))
    let tform = Math.atan2(tdiff, ldiff)

    setLeftDiff(ldiff)
    setTopDiff(tdiff)
    setLineWidth(width)
    setTransform(tform)
  }, [leftOne, topOne, leftTwo, topTwo])

  const dragStart = (e) => {
    setDragging(true)
    if (e.target.id === 'circleOne') {
      setDiffOneX(e.screenX - e.currentTarget.getBoundingClientRect().left)
      setDiffOneY(e.screenY - e.currentTarget.getBoundingClientRect().top)
    } else if (e.target.id === 'circleTwo') {
      setDiffTwoX(e.screenX - e.currentTarget.getBoundingClientRect().left)
      setDiffTwoY(e.screenY - e.currentTarget.getBoundingClientRect().top)
    }
  }

  const dragDrop = (e) => {
    let vLeftOne
    let vTopOne
    let vLeftTwo
    let vTopTwo

    if (dragging) {
      if (e.target.id === 'circleOne') {
        vLeftOne = e.screenX - diffOneX
        vTopOne = e.screenY - diffOneY
        setLeftOne(vLeftOne)
        setTopOne(vTopOne)
      } else if (e.target.id === 'circleTwo') {
        vLeftTwo = e.screenX - diffTwoX
        vTopTwo = e.screenY - diffTwoY
        setLeftTwo(vLeftTwo)
        setTopTwo(vTopTwo)
      }
    }
  }

  const dragEnd = () => {
    setDragging(false)
  }

  const handleChange = (e, id, source) => {
    if (id === 'circleOne') {
      if (source === 'X') {
        setLeftOne(parseInt(e.currentTarget.value))
      } else if (source === 'Y') {
        setTopOne(parseInt(e.currentTarget.value))
      }
    } else if (id === 'circleTwo') {
      if (source === 'X') {
        setLeftTwo(parseInt(e.currentTarget.value))
      } else if (source === 'Y') {
        setTopTwo(parseInt(e.currentTarget.value))
      }
    }
  }

  const handleChangeLine = (e) => {
    let val = parseInt(e.currentTarget.value) || 100
    let cos = Math.cos(transform) * val
    let sin = Math.sin(transform) * val

    setLeftTwo(cos - leftDiff + leftTwo)
    setTopTwo(sin - topDiff + topTwo)
  }

  return (
    <>
      <div className='Main'>
        <div
          className='line column v-center h-center'
          style={{
            top: `${topOne + 75}px`,
            left: `${leftOne + 75}px`,
            width: `${lineWidth}px`,
            transform: `rotate(${transform}rad)`,
          }}
        >
          <input
            className='lineInput'
            value={Math.round(lineWidth)}
            type='number'
            onChange={handleChangeLine}
          />
        </div>
        <div
          id='circleOne'
          className='column v-center h-center'
          style={{
            top: `${topOne}px`,
            left: `${leftOne}px`,
          }}
          onMouseDown={dragStart}
          onMouseMove={dragDrop}
          onMouseUp={dragEnd}
        >
          <span>
            X{' '}
            <input
              value={Math.round(leftOne)}
              type='number'
              onChange={(event) => handleChange(event, 'circleOne', 'X')}
            />
          </span>
          <span>
            Y{' '}
            <input
              value={Math.round(topOne)}
              type='number'
              onChange={(event) => handleChange(event, 'circleOne', 'Y')}
            />
          </span>
        </div>

        <div
          id='circleTwo'
          className='column v-center h-center'
          style={{
            top: `${topTwo}px`,
            left: `${leftTwo}px`,
          }}
          onMouseDown={dragStart}
          onMouseMove={dragDrop}
          onMouseUp={dragEnd}
        >
          <span>
            X{' '}
            <input
              value={Math.round(leftTwo)}
              type='number'
              onChange={(event) => handleChange(event, 'circleTwo', 'X')}
            />
          </span>
          <span>
            Y{' '}
            <input
              value={Math.round(topTwo)}
              type='number'
              onChange={(event) => handleChange(event, 'circleTwo', 'Y')}
            />
          </span>
        </div>
      </div>
    </>
  )
}

export default Main

import React, { useEffect, useRef, useCallback, useState } from 'react';

import { draw } from './utils';
import './PhotoCropper.css'

const PhotoCropper = ({ imageSrc }) => {
  const canvasRef = useRef(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);

  const drawCb = useCallback((cx, cv, x, y) => 
    draw(cx, cv, x, y), []);

  const handleMouseMove = e => {
    if (mouseDown) {
      setHeight(e.clientY);
      setWidth(e.clientX);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    drawCb(context, canvas, width, height, );
  }, [drawCb, width, height]);

  return (
    <div 
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      onMouseMove={handleMouseMove}
      className='image-zone'
    >
      <img 
        className='image-preview' 
        src={imageSrc} 
        alt='preview of upload'/>
      <canvas width='475' height='475' className='crop-container' ref={canvasRef} />      
    </div>
  )
}

export default PhotoCropper;

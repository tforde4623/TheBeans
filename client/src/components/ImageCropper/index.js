import React, { useEffect, useRef, useCallback, useState } from 'react';

import './PhotoCropper.css'


const PhotoCropper = ({ imageSrc }) => {
  const canvasRef = useRef(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);

  const draw = useCallback(
    (ctx, canvas, nWidth, nHeight) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const canvasEl = canvas.getBoundingClientRect();

      ctx.fillStyle = '#282828';
      ctx.fillRect(
        0, 0, 
        nWidth ? nWidth - canvasEl.left : 100, 
        nHeight ? nHeight - canvasEl.top : 100
      );

    }, []
  );

  const handleMouseMove = e => {
    if (mouseDown) {
      setHeight(e.clientY);
      setWidth(e.clientX);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, canvas, width, height);
  }, [draw, width, height]);

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

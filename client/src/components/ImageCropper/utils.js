export const draw = (ctx, canvas, nWidth, nHeight) => {
  const canvasEl = canvas.getBoundingClientRect();

  // find out what corner is being moved (with 10px of error)
  let newWidth;
  let newHeight;

  newWidth = nWidth - canvasEl.left;
  newHeight = nHeight - canvasEl.top;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#282828';
  ctx.fillRect(
    0, 0, 
    // TODO: 100 is temp, replace with starter height
    newWidth || 100, 
    newHeight || 100
  );
};

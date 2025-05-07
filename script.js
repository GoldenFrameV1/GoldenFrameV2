// Function to draw the Fibonacci spiral
function drawFibonacciSpiral(canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();

  let x = 0, y = 0;
  let size = Math.min(width, height);
  let scale = size / 1.618; // Golden ratio

  x = (width - scale) / 2;
  y = (height - scale) / 2;

  let a = scale / 2;
  let angle = 0;

  ctx.moveTo(x + a, y);

  for (let i = 0; i < 1000; i++) {
    let radius = a * Math.sqrt(i / 100);
    angle = i * 0.1;
    let spiralX = x + a + radius * Math.cos(angle);
    let spiralY = y + a + radius * Math.sin(angle);
    ctx.lineTo(spiralX, spiralY);
  }

  ctx.stroke();
}

// Wait for the DOM to be fully loaded before trying to access the canvas
document.addEventListener('DOMContentLoaded', () => {
  const overlayCanvas = document.getElementById('overlay');
  if (overlayCanvas) {
      drawFibonacciSpiral(overlayCanvas);

      // Redraw the spiral when the window is resized
      window.addEventListener('resize', () => drawFibonacciSpiral(overlayCanvas));
  } else {
      console.error("Canvas element with id 'overlay' not found.");
  }
});

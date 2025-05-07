function drawFibonacciSpiral(canvas, flipped = false) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;

  const maxSize = Math.min(width, height) * 0.9;

  const fib = [1, 1];
  for (let i = 2; i < 12; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  const totalSize = fib[fib.length - 1];
  const scale = maxSize / totalSize;

  let x = (width - maxSize) / 2;
  let y = (height - maxSize) / 2;

  let angle = 0;

  for (let i = fib.length - 1; i >= 0; i--) {
    const size = fib[i] * scale;

    ctx.beginPath();
    let cx = x, cy = y;

    switch (angle % 360) {
      case 0: cx += size; cy += size; break;
      case 90: cx += 0; cy += size; break;
      case 180: cx += 0; cy += 0; break;
      case 270: cx += size; cy += 0; break;
    }

    const radians = ((flipped ? 180 : 0) + angle) * Math.PI / 180;
    ctx.arc(cx, cy, size, radians, radians + Math.PI / 2);
    ctx.stroke();

    switch (angle % 360) {
      case 0: x += size; break;
      case 90: y += size; break;
      case 180: x -= fib[i + 1] * scale; break;
      case 270: y -= fib[i + 1] * scale; break;
    }

    angle += 90;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const overlayCanvas = document.getElementById('overlay');

  // Start the camera
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error('Error accessing camera:', err);
      });
  }

  // Draw the spiral
  function draw() {
    drawFibonacciSpiral(overlayCanvas, false);
  }

  draw();
  window.addEventListener('resize', draw);
});

// Function to start the camera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.getElementById('camera');
    videoElement.srcObject = stream;
  } catch (err) {
    console.error("Error accessing camera:", err);
  }
}

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

// Start the camera when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  startCamera();

  // Get the canvas for the spiral
  const overlayCanvas = document.getElementById('spiral');
  if (overlayCanvas) {
    // Redraw the Fibonacci spiral when the window is resized
    window.addEventListener('resize', () => drawFibonacciSpiral(overlayCanvas));

    // Initially draw the spiral
    drawFibonacciSpiral(overlayCanvas);
  } else {
    console.error("Canvas element with id 'spiral' not found.");
  }
});

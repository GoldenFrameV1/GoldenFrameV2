function drawFibonacciSpiral(canvas, flipped = false) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;

  // Fibonacci sequence
  const fib = [1, 1];
  for (let i = 2; i < 12; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  // Maximum size for the spiral
  const maxSize = Math.min(width, height) * 0.9;

  // Scale the Fibonacci numbers to fit inside the canvas
  const scale = maxSize / fib[fib.length - 1];

  // Start drawing the spiral from the center
  let x = (width - maxSize) / 2;
  let y = (height - maxSize) / 2;

  let angle = 0;

  // Draw the arcs following the golden ratio
  for (let i = 0; i < fib.length; i++) {
    const size = fib[i] * scale;

    ctx.beginPath();
    let cx = x, cy = y;

    // Adjust positions based on angle
    switch (angle % 360) {
      case 0: cx += size; cy += 0; break;
      case 90: cx += 0; cy += size; break;
      case 180: cx -= size; cy += 0; break;
      case 270: cx += 0; cy -= size; break;
    }

    // Rotate the spiral arcs if flipped
    let radians = (flipped ? 180 : 0) + angle;
    radians = radians * Math.PI / 180;
    ctx.arc(cx, cy, size, radians, radians + Math.PI / 2);
    ctx.stroke();

    // Move the starting point of the next arc
    switch (angle % 360) {
      case 0: x += size; break;
      case 90: y += size; break;
      case 180: x -= fib[i - 1] * scale; break;
      case 270: y -= fib[i - 1] * scale; break;
    }

    angle += 90;  // Move to the next quarter turn
  }
}

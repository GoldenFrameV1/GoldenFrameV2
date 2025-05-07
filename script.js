function drawFibonacciSpiral(canvas, flipped = false) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();

  let size = Math.min(width, height);
  let scale = size * 0.9; // Fit inside view

  let a = scale / 2;
  let x = (width - scale) / 2 + a;
  let y = (height - scale) / 2 + a;

  for (let i = 0; i < 1000; i++) {
    let radius = a * Math.sqrt(i / 100);
    let angle = i * 0.1;

    if (flipped) angle += Math.PI;

    let spiralX = x + radius * Math.cos(angle);
    let spiralY = y + radius * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(spiralX, spiralY);
    } else {
      ctx.lineTo(spiralX, spiralY);
    }
  }

  ctx.stroke();
}

let flipped = false;

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('overlay');
  const flipBtn = document.getElementById('flip');

  // Start camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error('Error accessing camera:', err);
    });

  const draw = () => drawFibonacciSpiral(canvas, flipped);
  draw();

  window.addEventListener('resize', draw);

  flipBtn.addEventListener('click', () => {
    flipped = !flipped;
    draw();
  });
});

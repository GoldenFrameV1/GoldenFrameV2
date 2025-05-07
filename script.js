function drawFibonacciSpiral(canvas, flipped = false) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;

  const fib = [1, 1];
  for (let i = 2; i < 12; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }

  const scale = Math.min(width, height) * 0.005;
  let x = width / 2;
  let y = height / 2;
  let direction = 0;

  for (let i = 0; i < fib.length; i++) {
    const r = fib[i] * scale;

    ctx.beginPath();

    let startAngle = (direction % 4) * Math.PI / 2;
    let endAngle = startAngle + Math.PI / 2;

    if (flipped) {
      [startAngle, endAngle] = [Math.PI - startAngle, Math.PI - endAngle];
    }

    switch (direction % 4) {
      case 0: x -= r; break;
      case 1: y -= r; break;
      case 2: x += r; break;
      case 3: y += r; break;
    }

    ctx.arc(x, y, r, startAngle, endAngle);
    ctx.stroke();

    direction++;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const overlayCanvas = document.getElementById('overlay');
  const flipCamBtn = document.getElementById('flip-camera');
  const flipSpiralBtn = document.getElementById('flip-spiral');
  let useFrontCamera = false;
  let spiralFlipped = false;
  let currentStream = null;

  async function startCamera() {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }

    try {
      currentStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: useFrontCamera ? 'user' : 'environment' }
        },
        audio: false
      });

      video.srcObject = currentStream;

      video.onloadedmetadata = () => {
        video.play();
        draw();
      };

      video.style.transform = useFrontCamera ? 'scaleX(-1)' : 'scaleX(1)';
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert("Camera access failed. Make sure permissions are allowed and you're using HTTPS.");
    }
  }

  flipCamBtn.addEventListener('click', () => {
    useFrontCamera = !useFrontCamera;
    startCamera();
  });

  flipSpiralBtn.addEventListener('click', () => {
    spiralFlipped = !spiralFlipped;
    draw();
  });

  function draw() {
    drawFibonacciSpiral(overlayCanvas, spiralFlipped);
  }

  window.addEventListener('resize', draw);

  draw();
  startCamera();
});

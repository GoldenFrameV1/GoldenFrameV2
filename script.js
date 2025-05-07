function drawFibonacciSpiral(canvas, flipped = false) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;

  const scale = Math.min(width, height) * 0.45;
  let x = width / 2;
  let y = height / 2;
  let a = scale / Math.sqrt(2); // Adjusted scale

  ctx.beginPath();

  for (let theta = 0; theta <= 4 * Math.PI; theta += 0.01) {
    const r = a * Math.exp(0.306349 * theta); // b = 0.306349 gives golden spiral
    const angle = flipped ? -theta : theta;
    const px = x + r * Math.cos(angle);
    const py = y + r * Math.sin(angle);
    if (theta === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.stroke();
}

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const overlayCanvas = document.getElementById('overlay');
  const flipCamBtn = document.getElementById('flip-camera');
  const flipSpiralBtn = document.getElementById('flip-spiral');
  const captureBtn = document.getElementById('capture');

  let useFrontCamera = false;
  let spiralFlipped = false;
  let currentStream = null;

  async function startCamera() {
    if (currentStream) {
      currentStream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
      video: {
        facingMode: { ideal: useFrontCamera ? 'user' : 'environment' }
      },
      audio: false
    };

    try {
      currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      console.warn('Initial camera access failed, retrying without facingMode:', err);

      // Fallback: try default camera
      try {
        currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      } catch (fallbackErr) {
        console.error('Fallback camera access failed:', fallbackErr);
        alert("Camera access failed. Make sure camera permissions are granted and you're using HTTPS.");
        return;
      }
    }

    video.srcObject = currentStream;

    video.onloadedmetadata = () => {
      video.play();
      draw();
    };

    video.style.transform = useFrontCamera ? 'scaleX(-1)' : 'scaleX(1)';
  }

  function draw() {
    drawFibonacciSpiral(overlayCanvas, spiralFlipped);
  }

  flipCamBtn.addEventListener('click', () => {
    useFrontCamera = !useFrontCamera;
    startCamera();
  });

  flipSpiralBtn.addEventListener('click', () => {
    spiralFlipped = !spiralFlipped;
    draw();
  });

  window.addEventListener('resize', draw);

  // Optional: capture screenshot
  captureBtn.addEventListener('click', () => {
    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = overlayCanvas.width;
    captureCanvas.height = overlayCanvas.height;
    const ctx = captureCanvas.getContext('2d');
    ctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
    ctx.drawImage(overlayCanvas, 0, 0);
    const dataUrl = captureCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'photo.png';
    link.click();
  });

  draw();
  startCamera();
});

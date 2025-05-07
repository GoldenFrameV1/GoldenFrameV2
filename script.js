const video = document.getElementById("camera");
const canvas = document.getElementById("spiral");
const ctx = canvas.getContext("2d");
const captureBtn = document.getElementById("capture");

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied.");
    console.error(err);
  }
}

function drawFibonacciSpiral() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();

  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let scale = Math.min(canvas.width, canvas.height) / 20;

  let a = 0.5;
  for (let t = 0; t < 4 * Math.PI; t += 0.01) {
    let r = a * Math.exp(0.30635 * t);
    let xPos = x + r * Math.cos(t);
    let yPos = y + r * Math.sin(t);
    if (t === 0) ctx.moveTo(xPos, yPos);
    else ctx.lineTo(xPos, yPos);
  }

  ctx.stroke();
}

video.addEventListener("loadedmetadata", drawFibonacciSpiral);
window.addEventListener("resize", drawFibonacciSpiral);

captureBtn.addEventListener("click", () => {
  const photoCanvas = document.createElement("canvas");
  photoCanvas.width = video.videoWidth;
  photoCanvas.height = video.videoHeight;
  const photoCtx = photoCanvas.getContext("2d");

  photoCtx.drawImage(video, 0, 0, photoCanvas.width, photoCanvas.height);

  const imgData = photoCanvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "photo.png";
  link.click();
});

initCamera();

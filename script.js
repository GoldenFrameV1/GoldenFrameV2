body {
  margin: 0;
  overflow: hidden;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#camera-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

video, canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#video {
  z-index: 1;
}

#overlay {
  z-index: 2;
  pointer-events: none;
}

#capture {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: black;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 3;
}

#flip {
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: black;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 3;
}

import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';

function App() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const saveImage = () => {
    if (capturedImage) {
      const a = document.createElement('a');
      a.href = capturedImage;
      a.download = 'captured-image.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="App">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Tomar Foto</button>
      {capturedImage && (
        <div>
          <h2>Foto Capturada:</h2>
          <img src={capturedImage} alt="Foto Capturada" />
          <button onClick={saveImage}>Guardar Foto</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

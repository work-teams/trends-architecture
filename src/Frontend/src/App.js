import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import Alert from 'react-bootstrap/Alert';

import { gql, GraphQLClient } from 'graphql-request'

const endpoint = 'http://localhost:4000/graphql'; // Reemplaza con la URL de tu servidor GraphQL

const userQuery = gql`
query user {
  user(id:1){
    name
    id
  }
}
`;

function App() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [randomNumber, setRandomNumber] = useState(null); // Nuevo estado para el número aleatorio

  const capture = () => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setTimeout(() => {
        setCapturedImage(imageSrc);
        setCameraActive(false);
        setLoading(false);
      }, 1000); // Mostrar la imagen capturada después de 2 segundos
    } else {
      setLoading(false);
    }
    setShowAlert(true);
  };

  const cancelCapture = () => {
    setCapturedImage(null);
    setCameraActive(true);
    setShowAlert(false);
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
    generateRandomNumber();
  };

  async function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    setRandomNumber(randomNumber);

    const client = new GraphQLClient(endpoint);

    try {
      const data = await client.request(userQuery);
      const userData = data.user;

      if (userData && userData.id) {
        if (randomNumber === userData.id) {
          setShowAlertMessage('Aceptado');
        } else {
          setShowAlertMessage('Denegado');
        }
      } else {
        setShowAlertMessage('Error en la consulta');
      }
    } catch (error) {
      console.error('Error en la consulta:', error);
      setShowAlertMessage('Error en la consulta');
    }
  }

  return (
    <div className="App w-50 row justify-content-center align-items-center">
      {cameraActive ? (
        <div className={`w-100 my-4 px-3 align-items-center text-center d-flex justify-content-between ${loading ? 'loading-overlay' : ''}`}>
          <h4 className="font-weight-bold">Autenticación Facial</h4>
          <button onClick={capture} className="btn btn-primary">
            <i className="fas fa-camera-retro mr-2"></i>Capturar
          </button>
        </div>
      ) : null}
      {cameraActive ? (
        <div className="col-12 text-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      ) : null}
      <div className={`text-center ${loading ? 'hidden' : ''}`}>
        {capturedImage && (
          <div className="w-100 my-4 align-items-center text-center d-flex justify-content-between">
            <h4 className="font-weight-bold">Foto capturada</h4>
            <div className="text-center">
            <button onClick={saveImage} className="btn btn-primary">
        <i className="far fa-save mr-2"></i>Guardar
          </button>
          {showAlertMessage && (
            <Alert variant={showAlertMessage === 'Aceptado' ? 'success' : 'danger'} onClose={() => setShowAlertMessage(false)} dismissible>
              {showAlertMessage}
            </Alert>
          )}
              <button onClick={cancelCapture} className="btn btn-danger ml-2">
                <i className="fas fa-arrow-left mr-2"></i>Cancelar
              </button>
            </div>
          </div>
        )}
        <img src={capturedImage} className={capturedImage ? '' : 'hidden'} />
      </div>
      {loading && (
        <div className="text-center position-absolute">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

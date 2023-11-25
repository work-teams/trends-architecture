import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import logo from '../assets/logo/logo.svg';
import '../assets/css/DataValidationFace.css';
import RegistroEventos from '../components/registroEventos.js';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-2' });
const lambda = new AWS.Lambda();

const DataValidationFace = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const registroEventos = new RegistroEventos();

  const capture = () => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setTimeout(() => {
        setCapturedImage(imageSrc);
        setCameraActive(false);
        setLoading(false);
        generateRandomNumber(); // Llamada a la función remota
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  const cancelCapture = () => {
    setCapturedImage(null);
    setCameraActive(true);
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

  const generateRandomNumber = async () => {
    try {
      const respuesta = await invokeLambdaFunction('arn:aws:lambda:us-east-2:595237805867:function:apiReniec', {});
      const fecha = await invokeLambdaFunction('arn:aws:lambda:us-east-2:595237805867:function:apiReniecFecha', {});
      const hora = await invokeLambdaFunction('arn:aws:lambda:us-east-2:595237805867:function:apiReniecHora', {});
      await registroEventos.registrarEventoData(respuesta, fecha, hora);

      const mensaje = await invokeLambdaFunction('arn:aws:lambda:us-east-2:595237805867:function:apiReniecMensaje', {});
      console.log(mensaje);
    } catch (error) {
      console.error("Error al enviar respuesta", error);
    }
  };

  const invokeLambdaFunction = async (functionARN, payload) => {
    const params = {
      FunctionName: functionARN,
      Payload: JSON.stringify(payload),
    };

    return new Promise((resolve, reject) => {
      lambda.invoke(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Payload);
        }
      });
    });
  };

  return (
    <div className="app-container">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="font-weight-bold">Autenticación Facial</h1>
      {cameraActive && (
        <div className={`capture-bar ${loading ? 'loading-overlay' : ''}`}>
          <div className="button-container">
            <Link to="/">
              <button className="action-button">Volver</button>
            </Link>
            <button onClick={capture} className="action-button">
              <i className="fas fa-camera-retro mr-2"></i>Validar
            </button>
          </div>
        </div>
      )}
      {cameraActive && (
        <div className="camera-container">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored={true}
            className="webcam"
          />
        </div>
      )}
      <div className={`image-container ${loading ? 'hidden' : ''}`}>
        {capturedImage && (
          <div className="image-bar">
            <h2 className="font-weight-bold">Foto capturada</h2>
            <div className="button-container">
              <button onClick={saveImage} className="action-button">
                <i className="far fa-save mr-2"></i>Guardar
              </button>
              <button onClick={cancelCapture} className="action-button">
                <i className="fas fa-arrow-left mr-2"></i>Cancelar
              </button>
            </div>
          </div>
        )}
        <img src={capturedImage} className={capturedImage ? 'captured-image' : 'hidden'} alt="Captured" />
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
    </div>
  );
};

export default DataValidationFace;

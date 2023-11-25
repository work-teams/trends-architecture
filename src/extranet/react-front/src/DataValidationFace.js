import React from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { saveImage } from '../components/js/logValidationFace';
import logo from './logo.svg';
import './DataValidationFace.css';
import useImageCapture from '../src/Components/js/captureLogic';
import validarDatosFace from '../src/services/validarDatosFace';

const DataValidationFace = () => {
  const { webcamRef, capturedImage, loading, cancelCapture } = useImageCapture();

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
            <button type="submit" onClick={validarDatosFace(capturedImage)} className="action-button">
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

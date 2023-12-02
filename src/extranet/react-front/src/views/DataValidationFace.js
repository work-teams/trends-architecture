import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import logo from '../assets/logo/logo.svg';
import '../assets/css/DataValidationFace.css';
import RegistroEventos from '../components/registroEventos.js';

const DataValidationFace = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');
  const [mensaje, setMensaje] = useState('');
  const registroEventos = new RegistroEventos();

  const closeModal = () => {
    setShowModal(false);
  };

  const showModalContent = async () => {
    try {
      const respuesta = generateRandomHash();
      const fecha = generateCurrentDate();
      const hora = generateCurrentTime();

      await registroEventos.registrarEventoData(respuesta, fecha, hora);
      setHora(hora);
      setFecha(fecha);
      setMensaje(generateMensaje());
      setShowModal(true);
    } catch (error) {
      console.error("Error al enviar respuesta", error);
    }
  };

  const capture = () => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setTimeout(() => {
        setCapturedImage(imageSrc);
        setCameraActive(false);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
    generateRandomNumber();
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
      const respuesta = generateRandomHash();
      const fecha = generateCurrentDate();
      const hora = generateCurrentTime();

      await registroEventos.registrarEventoData(respuesta, fecha, hora);
      console.log(generateMensaje());
    } catch (error){
      console.error("Error al enviar respuesta", error);
    }
  };

  const generateRandomHash = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const generateCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const generateCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const generateMensaje = () => {
    const numeroAleatorio = Math.floor(Math.random() * 100);
    const esPar = numeroAleatorio % 2 === 0;
    return esPar ? 'Se validó correctamente' : 'Se validó incorrectamente';
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
              <i className="fas fa-camera-retro mr-2"></i>Capturar
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
              
            
            <button onClick={showModalContent} id="validar-button">
              Validar
            </button>
      
              <button onClick={cancelCapture} className="action-button">
                <i className="fas fa-arrow-left mr-2"></i>Cancelar
              </button>
            </div>
          </div>
        )}
        <img src={capturedImage} className={capturedImage ? 'captured-image' : 'hidden'} alt="Captured" />
      </div>
      {showModal && (
        <div className="modal">
          <section className="modal-content">
            <h1>Notification</h1>
            <p>Hora: {hora}</p>
            <p>Fecha: {fecha}</p>
            <p>{mensaje}</p>
            <button onClick={closeModal} className="button-cerrar" >Cerrar</button>
          </section>
        </div>
      )}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}
    </div>
  );
};

export default DataValidationFace;

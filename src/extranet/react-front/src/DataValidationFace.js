import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { generateRandomHash, generateCurrentDate, generateCurrentTime, generateMensaje } from '../components/js/logValidation';
import { capture, cancelCapture, saveImage } from '../components/js/logValidationFace';
import logo from './logo.svg';
import './DataValidationFace.css';

class DataValidationFace extends React.Component {

  render() {
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
  }

  async validarDatos() {
    try {
        const respuesta = this.generateRandomHash();
        const fecha = this.generateCurrentDate();
        const hora = this.generateCurrentTime();

        const logEntryInput = {
            respuesta,
            fecha,
            hora,
        };

        const logResponse = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
        mutation AddLogEntry($input: LogEntryInput) {
          addLogEntry(input: $input) {
            id
            respuesta
            fecha
            hora
          }
        }
      `,
                variables: {
                    input: logEntryInput,
                },
            }),
        });

        const logData = await logResponse.json();
        console.log(this.generateMensaje());
        console.log('Registro de log insertado:', logData.data.addLogEntry);
        this.limpiarFormulario();
    } catch (error) {
        console.error('Error al insertar el registro de log:', error);
    }
  }


async obtenerLogEntries() {
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
        query GetLogEntries {
          logEntries {
            id
            respuesta
            fecha
            hora
          }
        }
      `,
            }),
        });

        const data = await response.json();
        const logEntries = data.data.logEntries;
        console.log('Registros de log:');
        console.log(logEntries);
    } catch (error) {
        console.error('Error al obtener los registros de log:', error);
    }
  }

}

export default DataValidationFace;

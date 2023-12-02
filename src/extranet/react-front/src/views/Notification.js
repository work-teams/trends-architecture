import React, { useState, useEffect } from 'react';
import '../assets/css/WelcomeView.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo.svg';


const Notification = () => {
    const [logData, setLogData] = useState(null);

    useEffect(() => {
      const originalConsoleLog = console.log;
  
      console.log = function (...args) {
        originalConsoleLog(...args); 
        const logMessage = args.join(' '); 
        // Verificar si el mensaje contiene la información deseada del log
        if (logMessage.includes('Registro de log insertado')) {
          const dataStartIndex = logMessage.indexOf('{'); // Encontrar el inicio del objeto JSON
          const dataEndIndex = logMessage.lastIndexOf('}') + 1; // Encontrar el final del objeto JSON
          const logDataStr = logMessage.substring(dataStartIndex, dataEndIndex); // Extraer el objeto JSON
          const parsedLogData = JSON.parse(logDataStr); // Convertir la cadena JSON a un objeto JS
          setLogData(parsedLogData); // Actualizar el estado con los datos del log
        }
      };
  
      // Limpieza al desmontar el componente para evitar fugas de memoria
      return () => {
        console.log = originalConsoleLog; // Restaurar la función original de la consola
      };
    }, []); 
  
    return (
      <div className="welcome-container">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Notification</h1>
        
        {logData && (
          <div>
            <p>Fecha: {logData.fecha}</p>
            <p>Hora: {logData.hora}</p>
            <h3>Se validó correctamente</h3>
          </div>
        )}
  
        <div className="form-group">
            <Link to="/">
            <button id="volver-button">Cerrar</button>
          </Link>
        </div>
      </div>
    );
  };
export default Notification

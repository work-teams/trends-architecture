import React, { useState, useEffect } from 'react';
import '../assets/css/WelcomeView.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo.svg';


const NotificationF = () => {
    const [logData, setLogData] = useState(null);

    useEffect(() => {
      const originalConsoleLog = console.log;
  
      // Redirigir la salida de la consola
      console.log = function (...args) {
        originalConsoleLog(...args); // Conservar el comportamiento de la consola original
        const logMessage = args.join(' '); // Unir los argumentos como un solo mensaje
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
    }, []); // Se ejecuta solo al montar el componente (equivalente a componentDidMount)
  
    return (
      <div className="welcome-container">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Notification</h1>
        <p>Este es el lugar donde se verá si el mensaje es correcto o incorrecto.</p>
        
        {logData && (
          <div>
            <h3>Se validó correctamente</h3>
            <p>Fecha: {logData.fecha}</p>
            <p>Hora: {logData.hora}</p>
          </div>
        )}
  
        <div className="form-group">
          <Link to='/data-validation-face'>
            <button id="volver-button">Volver a validar</button>
          </Link>
          <Link to="/">
            <button id="volver-button">Cambiar validacion</button>
          </Link>
        </div>
      </div>
    );
  };
export default NotificationF

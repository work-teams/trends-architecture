import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo.svg';

const Notification = () => {
  const [logData, setLogData] = useState(null);

  // Supongamos que la función getLogDataFromService es la que obtiene la información del log
  const getLogDataFromService = () => {
    // Aquí debes obtener la información del registro de log, por ejemplo, de una API o un archivo
    // Simulación de datos
    const logInfo = {
      id: '-NkSxOVsU7f-nNKTqTEg',
      respuesta: 'jk79lw6dxxel7ltnrlxg5',
      fecha: '2023-11-29',
      hora: '21:01:24',
      mensaje: 'Se validó correctamente'
    };
    // Actualizar el estado con la información del registro de log
    setLogData(logInfo);
  };

  useEffect(() => {
    // Llamada a la función para obtener la información del log
    getLogDataFromService();
  }, []); // Se ejecuta solo al montar el componente (equivalente a componentDidMount)

  return (
    <div className="welcome-container">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Notification</h1>
      <p>Este es el lugar donde se verá si el mensaje es correcto o incorrecto.</p>
      
      {logData && (
        <div>
          <h3>{logData.mensaje}</h3>
          <p>Fecha: {logData.fecha}</p>
          <p>Hora: {logData.hora}</p>
        </div>
      )}

      <div className="form-group">
        <Link to='/data-validation-form'>
          <button id="volver-button">Volver a validar</button>
        </Link>
        <Link to="/">
          <button id="volver-button">Cambiar validacion</button>
        </Link>
      </div>
    </div>
  );
};

export default Notification;

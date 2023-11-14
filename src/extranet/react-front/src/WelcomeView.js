import React from 'react';
import './WelcomeView.css'; // Asegúrate de crear un archivo CSS para estilizar tu componente
import logo from './logo.svg';

class WelcomeView extends React.Component {
    render() {
        return (
            <div className="welcome-container">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Bienvenido a FISI VALIDACIÓN</h1>
                <p>Accede a nuestros servicios de validación de identidad</p>

                <div className="button-container">
                    <button className="validation-button" onClick={() => console.log('Validación de Datos Sensibles')}>
                        Validación de Datos Sensibles
                    </button>
                    <button className="validation-button" onClick={() => console.log('Validación Facial')}>
                        Validación Facial
                    </button>
                </div>
            </div>
        );
    }
}

export default WelcomeView;

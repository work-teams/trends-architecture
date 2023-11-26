import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/WelcomeView.css';
import logo from '../assets/logo/logo.svg';

class WelcomeView extends React.Component {
    render() {
        return (
            <div className="welcome-container">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Bienvenido a FISI VALIDACIÓN</h1>
                <p>Accede a nuestros servicios de validación de identidad</p>

                <div className="button-container">
                    <Link to="/data-validation-form">
                        <button className="validation-button">Validación de Datos Sensibles</button>
                    </Link>
                    <Link to="/data-validation-face">
                        <button className="validation-button">Validación Facial</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default WelcomeView;

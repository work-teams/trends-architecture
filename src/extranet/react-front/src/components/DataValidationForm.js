import React from 'react';
import { Link } from 'react-router-dom';
import { addLogEntry } from '../services/logService';
import './DataValidationForm.css';
import logo from './logo.svg';

class DataValidationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            dni: '',
            edad: '',
            fechaNacimiento: '',
        };
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

            const logData = await addLogEntry(logEntryInput)

            console.log(this.generateMensaje());
            console.log('Registro de log insertado:', logData.data.addLogEntry);
            this.limpiarFormulario();
        } catch (error) {
            console.error('Error al insertar el registro de log:', error);
        }
    }

    generateRandomHash() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    generateCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    generateCurrentTime() {
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    generateMensaje() {
        const numeroAleatorio = Math.floor(Math.random() * 100);
        const esPar = numeroAleatorio % 2 === 0;
        return esPar ? 'Se validó correctamente' : 'Se validó incorrectamente';
    }

    limpiarFormulario() {
        this.setState({
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            dni: '',
            edad: '',
            fechaNacimiento: '',
        });
    }

    render() {
        return (
            <div>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Formulario de Validación de Datos Personales</h1>
                <form onSubmit={(e) => e.preventDefault()} id="data-validation-form">
                    <div className="form-group">
                        <label htmlFor="nombres">Nombres:</label>
                        <input
                            value={this.state.nombres}
                            onChange={(e) => this.setState({ nombres: e.target.value })}
                            type="text"
                            id="nombres"
                            name="nombres"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido-paterno">Apellido Paterno:</label>
                        <input
                            value={this.state.apellidoPaterno}
                            onChange={(e) => this.setState({ apellidoPaterno: e.target.value })}
                            type="text"
                            id="apellido-paterno"
                            name="apellido-paterno"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido-materno">Apellido Materno:</label>
                        <input
                            value={this.state.apellidoMaterno}
                            onChange={(e) => this.setState({ apellidoMaterno: e.target.value })}
                            type="text"
                            id="apellido-materno"
                            name="apellido-materno"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dni">DNI:</label>
                        <input
                            value={this.state.dni}
                            onChange={(e) => this.setState({ dni: e.target.value })}
                            type="text"
                            id="dni"
                            name="dni"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edad">Edad:</label>
                        <input
                            value={this.state.edad}
                            onChange={(e) => this.setState({ edad: e.target.value })}
                            type="number"
                            id="edad"
                            name="edad"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha-nacimiento">Fecha de Nacimiento:</label>
                        <input
                            value={this.state.fechaNacimiento}
                            onChange={(e) => this.setState({ fechaNacimiento: e.target.value })}
                            type="date"
                            id="fecha-nacimiento"
                            name="fecha-nacimiento"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={() => this.validarDatos()} id="validar-button">
                            Validar
                        </button>
                        <Link to="/">
                            <button id="volver-button">Volver</button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default DataValidationForm;
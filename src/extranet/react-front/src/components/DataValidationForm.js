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
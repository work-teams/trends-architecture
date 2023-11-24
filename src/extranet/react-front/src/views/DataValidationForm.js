import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/DataValidationForm.css';
import logo from '../assets/logo/logo.svg';
import { generateRandomHash, generateCurrentDate, generateCurrentTime, generateMensaje } from '../components/apiReniec.js';
import RegistroEventos from '../components/registroEventos.js';

const registroEventos = new RegistroEventos();

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

    async registrarEventoVD() {
        try {
            const respuesta = generateRandomHash();
            const fecha = generateCurrentDate();
            const hora = generateCurrentTime();
    
            await registroEventos.registrarEventoData(respuesta, fecha, hora);
            generateMensaje();
            this.limpiarFormulario();
        } catch (error) {
            console.error("Error al enviar respuesta", error);
        }
    }

    async volver() {
        //await registroEventos.obtenerLogEntries();
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

    validarTexto(event, campo) {
        // Verificar si se presionó la tecla de retroceso o borrar
        const esTeclaBorrar = event.inputType === 'deleteContentBackward' || event.code === 'Backspace';
    
        // Expresión regular para permitir solo letras y espacios
        const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
    
        if (!esTeclaBorrar && !regex.test(event.target.value)) {
            const newValue = event.target.value.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ\s]+/g, ''); // Remover caracteres no válidos
            this.setState({ [campo]: newValue }); // Actualizar el estado con el nuevo valor
            alert('Este campo solo admite texto');
        }
    }
  
    validarNumero(event, campo) {
        // Verificar si se presionó la tecla de retroceso o borrar
        const esTeclaBorrar = event.inputType === 'deleteContentBackward' || event.code === 'Backspace';
  
        // Expresión regular para permitir solo letras y espacios
        const regex = /^[0-9]+$/;
  
        if (!esTeclaBorrar && !regex.test(event.target.value)) {
          this[campo] = event.target.value.slice(0, -1);
          alert('Este campo solo adminte numero');
        }
    }
  
    validarEdadFecha() {
        const fechaIngresada = new Date(this.state.fechaNacimiento);
        const ahora = new Date();
        let edad = ahora.getFullYear() - fechaIngresada.getFullYear();
    
        // Verificar si aún no se ha cumplido el aniversario de este año
        if (
            fechaIngresada.getMonth() > ahora.getMonth() ||
            (fechaIngresada.getMonth() === ahora.getMonth() && fechaIngresada.getDate() > ahora.getDate())
        ) {
            edad--;
        }
    
        if (edad !== parseInt(this.state.edad, 10)) {
            alert('La edad no coincide con la fecha de nacimiento.');
            this.setState({ fechaNacimiento: '' }); // Limpiar campo fecha de nacimiento en el estado
        }
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
                            onChange={(e) => {
                                this.validarTexto(e, 'nombres'); // Llama a la función validarTexto
                                this.setState({ nombres: e.target.value }); // Actualiza el estado con el valor del input
                            }}
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
                            onChange={(e) => {
                                this.validarTexto(e, 'apellido-paterno'); // Llama a la función validarTexto
                                this.setState({ apellidoPaterno: e.target.value }); // Actualiza el estado con el valor del input
                            }}
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
                            onChange={(e) => {
                                this.validarTexto(e, 'apellido-materno'); // Llama a la función validarTexto
                                this.setState({ apellidoMaterno: e.target.value }); // Actualiza el estado con el valor del input
                            }}
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
                            onChange={(e) => {
                                this.validarNumero(e, 'dni'); // Llama a la función validarTexto
                                this.setState({ dni: e.target.value }); // Actualiza el estado con el valor del input
                            }}
                            type="text"
                            id="dni"
                            name="dni"
                            pattern="[0-9]{8}"
                            inputMode="numeric"
                            maxLength={8}
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
                            min="18"
                            max="99"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fecha-nacimiento">Fecha de Nacimiento:</label>
                        <input
                            value={this.state.fechaNacimiento}
                            onChange={(e) => this.setState({ fechaNacimiento: e.target.value })}
                            onBlur={(e) => this.validarEdadFecha(e, 'fecha-nacimiento')} // Llama a la función validarFechaEdad al perder el foco
                            type="date"
                            id="fecha-nacimiento"
                            name="fecha-nacimiento"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={() => this.registrarEventoVD()} id="validar-button">
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

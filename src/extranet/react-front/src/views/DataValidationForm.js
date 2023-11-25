import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/DataValidationForm.css';
import logo from '../assets/logo/logo.svg';
import RegistroEventos from '../components/registroEventos.js';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-2' });
const lambda = new AWS.Lambda();

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
            const respuesta = await this.invokeLambdaFunction('arn:aws:lambda:us-east-2:595237805867:function:apiReniec', {});
            const fecha = await this.invokeLambdaFunction('arn:aws:lambda:us-east-2:595237805867:function:apiReniecFecha', {});
            const hora = await this.invokeLambdaFunction('arn:aws:lambda:us-east-2:595237805867:function:apiReniecHora', {});
            await registroEventos.registrarEventoData(respuesta, fecha, hora);

            const mensaje = await this.invokeLambdaFunction('arn:aws:lambda:us-east-2:595237805867:function:apiReniecMensaje', {});
            console.log(mensaje);
            this.limpiarFormulario();
        } catch (error) {
            console.error("Error al enviar respuesta", error);
        }
    }

    invokeLambdaFunction = async (functionARN, payload) => {
        const params = {
            FunctionName: functionARN,
            Payload: JSON.stringify(payload),
        };

        return new Promise((resolve, reject) => {
            lambda.invoke(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.Payload);
                }
            });
        });
    }

    async volver() {
        //await registroEventos.obtenerLogEntries();
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

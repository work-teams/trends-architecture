<template>
    <h1 class="titulo-reportes">Reportes</h1>
    <hr>
    <div class="container">
      <div class="form-container">
        <div class="dashboard">
          <h2>Dashboard</h2>
          <canvas id="grafico01" class="chart-container"></canvas>
          <canvas id="grafico02" class="chart-container"></canvas>
        </div>
        <div class="btn-form">
          <button @click="irAdminForm">Crear administrador</button>
          <button @click="refrescarReportes">Actualizar Reportes</button>
          <button @click="irAuthForm">Salir</button>
        </div>
      </div>
  
      <div class="logs-list">
        <h2>Listado de Logs</h2>
        <div>
            <label for="registrosAMostrar" style="display: inline-block;">Mostrar: </label>
            <input type="number" id="registrosAMostrar" v-model="registrosAMostrar" min=0 max="totalRegistros" @input="validarRegistrosAMostrar" style="display: inline-block; width: 70px;">
            <span style="display: inline-block;">de {{ totalRegistros }} logs</span>
        </div>
        <div class="radio-container">
            <input type="radio" id="recientes" v-model="orden" value="recientes" name="opcionTiempoLogs" pattern="\d*" style="margin-right: 5px;" @change="ordenarLogs">
            <label for="recientes">Logs más recientes</label>

            <input type="radio" id="antiguos" v-model="orden" value="antiguos" name="opcionTiempoLogs" style="margin-right: 5px;" @change="ordenarLogs">
            <label for="antiguos">Logs más antiguos</label>
        </div>
        <ul>
            <li v-for="(logs, index) in reportes.slice(0, registrosAMostrar)" :key="index">
                {{ logs.fecha }} --- {{ logs.hora }}
                <button @click="none" class="log-btn" disabled>Log</button>
            </li>
        </ul>
      </div>
</div>
</template>  
  
<script>

import Chart from 'chart.js/auto';

export default {
    data() {
        return {
            fecha: "",
            hora: "",
            reportes: [],
            orden: "recientes",
            totalRegistros: 0,
            registrosAMostrar: 10,
            obtainedReport: null,
            chart: null,
            isEdit: false,
        };
    },
    methods: {
        ordenarLogs() {
            console.log("importa?");
            if (this.orden === 'recientes') {
                // Ordenar de más reciente a más antiguo
                this.reportes.sort((a, b) => {
                const dateA = new Date(`${a.fecha} ${a.hora}`);
                const dateB = new Date(`${b.fecha} ${b.hora}`);
                return dateB - dateA;
                });
            } else if (this.orden === 'antiguos') {
                // Ordenar de más antiguo a más reciente
                this.reportes.sort((a, b) => {
                const dateA = new Date(`${a.fecha} ${a.hora}`);
                const dateB = new Date(`${b.fecha} ${b.hora}`);
                return dateA - dateB;
                });
            }
        },
        validarRegistrosAMostrar() {
            // Obtén el valor del input
            let value = this.registrosAMostrar;

            // Si el valor no es un número válido, establece un valor predeterminado
            if (!/^\d*$/.test(value) || value < 0) {
                this.registrosAMostrar = "";
            } else if (value > this.totalRegistros) {
                // Si es mayor que totalRegistros, establece el valor máximo
                this.registrosAMostrar = this.totalRegistros.toString();
            }
        },
        async mostrarReportes() {
            if (this.registrosAMostrar <= 0) {
                console.warn('Por favor, ingrese un número mayor que cero.');
                return;
            }
            else{
                try {
                    const response = await fetch("http://localhost:4000/graphql", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            query: `
                                query getLogEntries {
                                    logEntries {
                                        fecha
                                        hora
                                    }
                                }
                            `,
                        })
                    });

                    const responseData = await response.json();

                    if (responseData.data && responseData.data.logEntries) {
                        this.reportes = responseData.data.logEntries;
                        const logs = this.reportes;
                        this.totalRegistros = responseData.data.logEntries.length;
                        console.log(JSON.parse(JSON.stringify(logs)))

                        // Verifica si this.chart está definido antes de actualizar el gráfico
                        if (!this.chart) {
                            this.prepararGraficoConteoLogsDia();
                            this.prepararGraficoHora();
                        } else {
                            console.warn('El gráfico no está definido 01. No se puede actualizar.');
                        }
                    } else if (responseData.errors) {
                        console.error("Errores en la respuesta del servidor GraphQL:", responseData.errors);
                    } else {
                        console.error("La respuesta del servidor GraphQL no tiene la estructura esperada:", responseData);
                    }
                } catch (error) {
                    console.error("Error al obtener lista de reportes:", error);
                }
            }
        },
        logEntries(logs) {
            this.isEdit = true;
            this.obtainedReport = logs;
            this.fecha = logs.fecha;
            this.hora = logs.hora;
        },
        graficarConteoLogsDia(uniqueDates, dataPoints) {
            var chartHeight = uniqueDates.length * 20;
            var chartWidth = 700;

            var config01 = {
                type: 'bar',
                data: {
                    labels: uniqueDates,
                    datasets: [{
                        label: "Logs por día",
                        backgroundColor: "rgba(150,150,255,0.9)",
                        hoverBorderColor: "rgba(0,0,255,0)",
                        data: dataPoints,
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Fecha', // Nombre del eje Y
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Número de Logs', // Nombre del eje X
                            },
                        },
                    },
                },
            };

            var ctx = document.getElementById("grafico01").getContext("2d");
            ctx.canvas.height = chartHeight;
            ctx.canvas.width = chartWidth;
            new Chart(ctx, config01);
        },
        prepararGraficoConteoLogsDia() {
            try {
                const logs = this.reportes;

                // Procesa los datos para contar el número de registros por fecha
                const counts = {};
                logs.forEach(log => {
                    const fechaKey = log.fecha; // No necesitas dividir la fecha
                    counts[fechaKey] = (counts[fechaKey] || 0) + 1;
                });

                // Convierte los datos procesados en un formato que Chart.js pueda entender
                const uniqueDates = Object.keys(counts);
                const dataPoints = Object.values(counts);

                this.graficarConteoLogsDia(uniqueDates, dataPoints);
            } catch (error) {
                console.error("Error al obtener gráfico:", error);
            }
        },
        graficarHora(horasLabels, countsData) {
            var chartHeight = horasLabels.length * 20;
            var chartWidth = 700;
            // Convertir las etiquetas a números
            horasLabels = horasLabels.map(Number);
            horasLabels.sort((a, b) => a - b);

            var config02 = {
                type: 'bar',
                data: {
                    labels: horasLabels,
                    datasets: [{
                        label: 'Logs por hora',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        hoverBorderColor: "rgba(0,0,255,0)",
                        borderWidth: 2,
                        data: countsData,
                    }],
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                            position: 'bottom', // Posición del eje X
                            title: {
                                display: true,
                                text: 'Horas (en formato de 24h)', // Nombre del eje X
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Número de Logs', // Nombre del eje Y
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                        },
                        datalabels: {
                            color: 'black',
                            anchor: 'end',
                            align: 'end',
                            formatter: (value) => {
                                return value;
                            },
                        },
                    },
                },
            };

            var ctx2 = document.getElementById("grafico02").getContext("2d");
            ctx2.canvas.height = chartHeight;
            ctx2.canvas.width = chartWidth;
            new Chart(ctx2, config02);
        },
        prepararGraficoHora() {
            try {
                const logs = this.reportes;

                // Procesa los datos para contar el número de registros por hora
                const countsPorHora = {};
                logs.forEach(log => {
                    const horaKey = log.hora.split(':')[0]; // Solo toma la parte de la hora
                    countsPorHora[horaKey] = (countsPorHora[horaKey] || 0) + 1;
                });

                // Convierte los datos procesados en un formato que Chart.js pueda entender
                const horasLabels = Object.keys(countsPorHora);
                const countsData = Object.values(countsPorHora);

                // Llama a la función que grafica el conteo por hora
                this.graficarHora(horasLabels, countsData);
            } catch (error) {
                console.error("Error al obtener gráfico por hora:", error);
            }
        },
        refrescarReportes() {
            // Otras lógicas que necesites realizar antes de recargar la página
            window.location.reload();
        },
        irAdminForm() {
            if (this.$router) {
                console.log("Saliendo de la sesión del administrador...");
                this.$router.push('/admin-form');
            } else {
                console.error("$router no está disponible");
            }
        },  
        irAuthForm() {
            if (this.$router) {
                console.log("Dirigiendo a las opciones del Administrador...");
                this.$router.push('/auth-form');
            } else {
                console.error("$router no está disponible");
            }
        }, 
    },
    mounted() {
        this.$nextTick(() => {
            try {
                this.mostrarReportes();
            } catch (error) {
                console.error('Ocurrió un error:', error);
            }
        });
    }
};
</script>
  
<style>

body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f2f2f2;
  margin: 0;
  padding: 0;
}

.container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* Alinear elementos en la parte superior */
    height: 100vh;
    margin-top: 20px;
    /* Ajustar el margen superior según tus necesidades */
}

.form-container {
    margin-right: 20px;
    /* Espaciado entre el formulario y la lista */
}

.btn-form {
    text-align: center;
    display: grid;
    grid-template-columns: repeat(3, 200px);
    gap: 10px;
    margin: 20px auto;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    margin-top: 10px;
    padding: 8px 15px;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
}

button.log-btn {
    cursor: default;
}

.admin-list {
    border: 1px solid #ccc;
    padding: 10px;
    overflow-y: auto;
    /* Agregado para la barra de desplazamiento vertical */
    max-height: 600px;
    /* Altura máxima para la lista antes de agregar la barra de desplazamiento */
    max-width: 1000px;
}

ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

li {
    margin-bottom: 5px;
    background-color: #ecf0f1;
    padding: 5px;
    border-radius: 4px;
    width: 100%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  margin-top: 20px;
}

.form-container {
  margin-right: 20px;
}

.form {
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  margin-right: 10px;
}

.bar-inner {
  background-color: #3498db;
  height: 20px; /* Altura de la barra */
  transition: width 0.5s ease;
}

.count {
  margin-left: 10px;
}

.dashboard {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #ffffff;
}

.logs-list {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 0px;
  padding-left: 20px;
  padding-right: 36px;
  height: 669px;
  overflow-y: auto;
  background-color: #ffffff;
}

.radio-container {
    display: flex;
    align-items: center;
    margin-right: 5px;
    }

.radio-container input {
    margin-right: 5px;
}

h1.titulo-reportes {
    background-color: #333;
    color: white;
    padding: 10px; /* Ajusta según sea necesario para el espaciado interno */
  }

button.log-btn:hover {
    cursor: default;
}
</style>
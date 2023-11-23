<template>
    <h1>Reportes</h1>
    <hr>
    <div class="container">
      <div class="form-container">
        <div class="dashboard">
          <h2>Dashboard</h2>
          <canvas id="grafico01" class="chart-container"></canvas>
          <canvas id="grafico02" class="chart-container"></canvas>
        </div>
        <div class="form">
          <button @click="refrescarReportes">Actualizar Reportes</button>
          <button @click="salir">Salir</button>
        </div>
      </div>
  
      <div class="logs-list">
        <h2>Listado de Logs</h2>
        <ul>
          <li v-for="(logs, index) in reportes" :key="index">
            {{ logs.fecha }} --- {{ logs.hora }}
            <button @click="none">Log</button>
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
            obtainedReport: null,
            chart: null,
            isEdit: false,
        };
    },
    methods: {
        async mostrarReportes() {
            try {
                const response = await fetch("http://localhost:4000/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: `
                            query {
                                obtenerReportes {
                                    fecha
                                    hora
                                }
                            }
                        `
                    })
                });

                const responseData = await response.json();

                if (responseData.data && responseData.data.obtenerReportes) {
                    this.reportes = responseData.data.obtenerReportes;
                    const logs = this.reportes;
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
        },
       async obtenerReportes(logs) {
            this.isEdit = true;
            this.obtainedReport = logs;
            this.fecha = logs.fecha;
            this.hora = logs.hora;
        },
        graficarConteoLogsDia(uniqueDates, dataPoints) {
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
                }
            };

            var ctx = document.getElementById("grafico01").getContext("2d");
            new Chart(ctx, config01);
         },
        prepararGraficoConteoLogsDia() {
            try {
                // Utiliza la información ya obtenida en this.reportes
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
            var config02 = {
                type: 'bar',
                data: {
                    labels: horasLabels,
                    datasets: [{
                        label: 'Horas con más accesos',
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
                        },
                        y: {
                            beginAtZero: true,
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
            new Chart(ctx2, config02);
        },
        prepararGraficoHora() {
            try {
                // Utiliza la información ya obtenida en this.reportes
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
        salir() {
            if (this.$router) {
                console.log("Saliendo de la sesión del administrador...");
                this.$router.push('/admin-form');
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

.form {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    max-width: 300px;
    margin: 0 auto;
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
    margin-bottom: 10px;
    background-color: #ecf0f1;
    padding: 8px;
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
  margin-bottom: 20px;
  padding: 10px;
}

.logs-list {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 36px;
}

</style>
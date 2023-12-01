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
                    const response = await fetch("https://msbackreport.onrender.com/graphql", {
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
<script>
    import './ReportsLogFunctions';
</script>

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
# EJECUTAR PROYECTO
El proyecto aún se encuentra para ejecutar en LOCAL, Docker aún no esta configurado.
Se configurará Docker dentro de unas horas.

Comandos para levantar el proyecto en LOCAL:
Ejecutar `npm i` en todas las carpetas Backend y Frontend de todos los microservicios.

### FRONTEND
#### Microservicio Validación Sensibles
- Cambiarse a la carpeta de vue-front `cd src/ms-val-sen/vue-front/`
- Estando dentro de ella ejecutar el comando `npm run serve`

#### Microservicio Validación Facial
- Ingresar a carperta Frontend y ejecutar por consola los comandos `npm intall` y seguido de `npm start`

### BACKEND
#### Microservicio Validación Sensible
- No es necesario cambiar de lugar.
- Ejecutar el comando `node src/ms-val-sen/backend/server.js`

#### Microservicio Validación Facial
- Ingresar a carperta Backend y ejecutar por consola los comandos `npm intall` y seguido de `npm start`

# trends-architecture
Repositorio para el curso de Tendencias de Arquitectura

## Docker
Ejecutar el contenedor de desarrollo con: `docker compose up`

## Credenciales de Firebase
Para acceder a Firebase, los miembros del equipo deben **descargar las credenciales desde el proyecto Firebase** en un archivo con extensión `.json`.  
Posteriormente, deben renombrarlo como `firebase.json` y colocarlo en la raíz del proyecto.

## Variable de entorno
En lo que respecta a la gestión de variables de entorno, es necesario que los miembros del equipo **creen un archivo** denominado `.env` en la raíz del proyecto.  
Dentro de este archivo, se debe definir la variable `GOOGLE_APPLICATION_CREDENTIALS` y asignarle la **ruta absoluta** al archivo `firebase.json` si se está trabajando en un entorno local.  
En caso de estar trabajando desde un contenedor, se debe asignar la ruta `/app/firebase.json` a esta variable.

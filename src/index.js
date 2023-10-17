const app = require('./app');

const PORT = 3000;

async function main() {
    await app.listen(PORT);
    console.log('The server is running on port 3000')
}

main();
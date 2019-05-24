/* eslint-disable handle-callback-err */
/* eslint-disable no-console */

const net = require('net');
const port = 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end();
    if (!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      const exec = require('child_process').exec;
      exec('npm run electron-dev');
    }
  });

tryConnection();

client.on('error', error => {
  setTimeout(tryConnection, 1000);
});
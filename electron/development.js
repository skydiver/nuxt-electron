/* eslint-disable no-console */
const path = require('path');
const http = require('http');
const electron = require('electron');

const loader = () => {
  const _NUXT_URL_ = `http://localhost:3000`;

  const config = {};
  config.dev = false;

  let win = null;
  const app = electron.app;

  const newWin = () => {
    win = new electron.BrowserWindow({
      icon: path.join(__dirname, 'static/icon.png')
    });

    win.maximize();
    win.on('closed', () => (win = null));
    win.webContents.openDevTools();

    // Install vue dev tool and open chrome dev tools
    const {
      default: installExtension,
      VUEJS_DEVTOOLS
    } = require('electron-devtools-installer');
    installExtension(VUEJS_DEVTOOLS.id)
      .then(name => {
        console.log(`Added Extension:  ${name}`);
        win.webContents.openDevTools();
      })
      .catch(err => console.log('An error occurred: ', err));
    // Wait for nuxt to build
    const pollServer = () => {
      http
        .get(_NUXT_URL_, res => {
          if (res.statusCode === 200) {
            win.loadURL(_NUXT_URL_);
          } else {
            setTimeout(pollServer, 300);
          }
        })
        .on('error', pollServer);
    };
    pollServer();
  };

  app.on('ready', newWin);
  app.on('window-all-closed', () => app.quit());
  app.on('activate', () => win === null && newWin());
};

module.exports = { loader };

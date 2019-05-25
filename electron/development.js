/* eslint-disable no-console */
const path = require('path');
const { app, BrowserWindow } = require('electron');
const {
  default: installExtension,
  VUEJS_DEVTOOLS
} = require('electron-devtools-installer');

const loader = () => {
  const _NUXT_URL_ = `http://localhost:3000`;

  let mainWindow = null;

  const newWin = () => {
    mainWindow = new BrowserWindow({
      icon: path.join(__dirname, 'static/icon.png')
    });
    mainWindow.maximize();
    mainWindow.on('closed', () => (mainWindow = null));

    installExtension(VUEJS_DEVTOOLS.id)
      .then(name => {
        mainWindow.webContents.openDevTools();
      })
      .catch(err => console.log('An error occurred: ', err));
    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(_NUXT_URL_);
  };

  app.on('ready', newWin);
  app.on('window-all-closed', () => app.quit());
  app.on('activate', () => mainWindow === null && newWin());
};

module.exports = { loader };

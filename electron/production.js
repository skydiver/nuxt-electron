const path = require('path');
const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');

const loadURL = serve({ directory: '.nuxt-build' });

let mainWindow = null;

const loader = async () => {
  await app.whenReady();

  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'static/icon.png')
  });
  mainWindow.maximize();
  mainWindow.on('closed', () => (mainWindow = null));

  await loadURL(mainWindow);
};

module.exports = { loader };

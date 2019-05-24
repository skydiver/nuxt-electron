/* eslint-disable no-console */
const path = require('path');
const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');

const loadURL = serve({ directory: 'build' });

let mainWindow = null;

const loader = async () => {
  await app.whenReady();

  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, 'static/icon.png')
  });
  mainWindow.maximize();
  mainWindow.on('closed', () => (mainWindow = null));
  mainWindow.webContents.openDevTools();

  await loadURL(mainWindow);
};

module.exports = { loader };
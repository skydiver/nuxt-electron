const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV === 'DEV';

let _NUXT_URL_ = 'http://localhost:3000';

if (!isDev) {
  const serve = require('electron-serve');
  serve({ directory: '.nuxt-build' });
  _NUXT_URL_ = 'app://-';
}

let mainWindow = null;

const createWindow = async () => {
  await app.whenReady();

  mainWindow = new BrowserWindow({
    backgroundColor: '#FFF',
  });

  mainWindow.maximize();
  mainWindow.on('closed', () => (mainWindow = null));

  if (isDev) {
    mainWindow.webContents.openDevTools();
    installVueDevTools();
  }

  mainWindow.loadURL(_NUXT_URL_);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => mainWindow === null && createWindow());

const installVueDevTools = () => {
  if (isDev) {
    const {
      default: installExtension,
      VUEJS_DEVTOOLS,
    } = require('electron-devtools-installer');
    installExtension(VUEJS_DEVTOOLS.id)
      .then(() => {
        mainWindow.webContents.openDevTools();
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('An error occurred: ', err));
    mainWindow.webContents.openDevTools();
  }
};

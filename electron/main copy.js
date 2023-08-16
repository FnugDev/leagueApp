const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const overwolf = require('@overwolf/ow-electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    frame: true,
    resizable: false, 
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000/summoner/eune/fnug' // Development server URL for Next.js
      : `file://${path.join(__dirname, '../.next/server/pages/index.html')}` // Path to the compiled Next.js output
  );

  // Listen for Overwolf's game events
  // overwolf.games.events.onNewEvents.addListener((info) => {
  //   const inChampionSelect = info.events.some(
  //     (event) => event.name === 'champ_select'
  //   );

  //   if (inChampionSelect) {
  //     // Show your app
  //     mainWindow.show();
  //   } else {
  //     // Hide your app
  //     mainWindow.hide();
  //   }
  // });

  // // Start Overwolf's game events
  // overwolf.games.events.setRequiredFeatures(['game_flow']).then(() => {
  //   overwolf.games.events.start();
  // });

  // Uncomment the following line to open the DevTools in the Electron window for debugging
  // win.webContents.openDevTools();
  win.webContents.on('did-finish-load', () => {
    console.log('CSS file loading...');
    const customCssPath = path.join(__dirname, 'styles.css');
    console.log('CSS file path:', customCssPath);
    const customCss = require('fs').readFileSync(customCssPath, 'utf8');
    console.log('CSS content:', customCss);
    win.webContents.insertCSS(customCss);
    console.log('CSS inserted.');
  });

}



app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

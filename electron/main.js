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

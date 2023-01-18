module.exports = {
  browserWindow: {
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    },
    maximize: false
    // show: false,
  },
  idleTime: 100
}

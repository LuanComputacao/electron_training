module.exports = {
  browserWindow: {
    width: 2000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
    // show: false

  },
  idleTime: 100
}

const { createWindow } = require('../main')

module.exports = {
  /**
   * @param {BrowserWindow} mainWindow
   */
  onResume: function (mainWindow) {
    console.log('onResume')
    if (!mainWindow) createWindow()
  },

  /**
   * @param {BrowserWindow} mainWindow
   */
  onSuspend: function (mainWindow) {
    console.log('onSuspend')
    console.log('Saving some data')
  }
}

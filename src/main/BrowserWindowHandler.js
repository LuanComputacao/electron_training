const { app } = require('electron')
const browserWindowBlur = require('./browserWindowBlur')
const { createWindow, mainWindow } = require('./main')

module.exports = {
  main: function () {
    app.on('browser-window-blur', () => {
      console.log('Window is not focused')
      browserWindowBlur.quitApp(app)
    })

    app.on('browser-window-focus', () => {
      console.log('Window is focused')
    })

    app.on('before-quit', e => {
      console.log('App is quitting...')
      // E.preventDefault()
    })

    // Quit when all windows are closed - (Not macOS- Darwin)
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('before-input-event', (event, input) => {
      console.log(`${input.type} ${input.key}`)
    })

    app.on('activate', () => {
      console.log('App is activated')
      if (mainWindow === null) {
        createWindow()
      }
    })
  }
}

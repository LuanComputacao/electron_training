const { app, ipcMain, desktopCapturer } = require('electron')

ipcMain.handle(
  'DESKTOP_CAPTURER_GET_SOURCES',
  (event, opts) => desktopCapturer.getSources(opts)
)

ipcMain.handle('APP_PATH', (event) => {
  return app.getPath('desktop')
})

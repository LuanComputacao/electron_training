const { session } = require('electron')

module.exports = {
  main: function (mainWindow) {
    const customSession = session.fromPartition('persist:custom')
    const ses = mainWindow.webContents.session
    console.log(ses)
    console.log(session.defaultSession)
    console.log(session.defaultSession.getUserAgent())
    console.log(Object.is(ses, customSession))
  }
}

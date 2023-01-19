const { app, dialog } = require('electron')
const config = require('../../config.js')

module.exports = {
  /**
   * @param {BrowserWindow} mainWindow
   */
  onDidFinishLoad: function (mainWindow) {
    mainWindow.webContents.on('did-finish-load', () => {
      dialog.showOpenDialog(mainWindow, {
        buttonLabel: 'Select a photo',
        defaultPath: app.getPath('home'),
        properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
      }).then(result => {
        console.log(result)
      })

      const answers = ['Yes', 'No', 'Maybe']

      dialog.showMessageBox({
        title: 'Message Box',
        message: 'Please select an option',
        detail: 'Message details',
        buttons: answers
      }).then(result => {
        console.log(`User selected: ${answers[result.response]}`)
      })
    })
  },

  /**
   * @param {BrowserWindow} mainWindow
   */
  onDomReady: function (mainWindow) {
    mainWindow.webContents.on('dom-ready', () => {
      console.log('DOM Ready...')
    })
  },

  /**
   * @param {BrowserWindow} mainWindow
   */
  onBeforeInputEvent: function (mainWindow) {
    mainWindow.webContents.on('before-input-event', (event, input) => {
      console.log(`${input.type} ${input.key}`)
      if (input.key === 'F12' && input.type === 'keyUp') {
        if (mainWindow.webContents.isDevToolsOpened()) {
          mainWindow.webContents.closeDevTools()
        } else {
          mainWindow.webContents.openDevTools()
        }
      }
    })
  },

  /**
   * @param {BrowserWindow} mainWindow
   */
  onContextMenu: function (mainWindow) {
    mainWindow.webContents.on('context-menu', (e, params) => {
      console.log('context-menu', params)
      e.preventDefault()
    })
  },

  /**
   * @param {BrowserWindow} mainWindow
   */
  setWindowOpenHandler: function (mainWindow) {
    mainWindow.webContents.setWindowOpenHandler((details) => {
      console.log(`Creating new window for: ${details.url}`)
      return { action: 'deny' }
    })
  },

  /**
   * @param {BrowserWindow} mainWindow
   */
  devTools: function (mainWindow) {
    if (config.env === 'development') {
      mainWindow.webContents.openDevTools()
    }
  }
}

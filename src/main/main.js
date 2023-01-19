const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = electron
const windowStateKeeper = require('electron-window-state')
const conf = require('../config.js')
const Session = require('./Session.js')
const WebContents = require('./browser_window/WebContents.js')
const PowerMonitor = require('./browser_window/PowerMonitor.js')
const BrowserWindowHandler = require('./Session')

require('./ipc')

// Keep a global reference of the window object, if you don't, the window will
// be closed automacally when the JavaScript objects is garbage collected.

let mainWindow

const mainMenu = Menu.buildFromTemplate(require('./mainMenu'))

// Create a new BrowserWindow when 'app' is ready
function createWindow () {
  console.log('App is ready')

  const winState = windowStateKeeper(conf.browserWindow)
  console.log('winState', winState)

  mainWindow = new BrowserWindow({
    ...conf.browserWindow,
    x: winState.x,
    y: winState.y,
    show: false
  })

  Session.main(mainWindow)
  winState.manage(mainWindow)

  // - - - - - - - - - - - - - - - - - - - - - - - -
  // MAIN WINDOW
  // - - - - - - - - - - - - - - - - - - - - - - - -
  mainWindow.loadFile('index.html')
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('close', () => {
    mainWindow = null
  })
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // - - - - - - - - - - - - - - - - - - - - - - - -
  // WEB CONTENTS HANDLERS
  // - - - - - - - - - - - - - - - - - - - - - - - -
  // WebContents.onDidFinishLoad(mainWindow)
  WebContents.onDomReady(mainWindow)
  WebContents.onBeforeInputEvent(mainWindow)
  WebContents.onContextMenu(mainWindow)
  WebContents.setWindowOpenHandler(mainWindow)
  WebContents.devTools(mainWindow)
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // - - - - - - - - - - - - - - - - - - - - - - - -
  // POWER MONITOR HANDLERS
  // - - - - - - - - - - - - - - - - - - - - - - - -
  PowerMonitor.onResume(mainWindow)
  PowerMonitor.onSuspend(mainWindow)

  // - - - - - - - - - - - - - - - - - - - - - - - -
  // MENU HANDLERS
  // - - - - - - - - - - - - - - - - - - - - - - - -
  Menu.setApplicationMenu(mainMenu)
}

ipcMain.on('channel1', (e, props) => {
  console.log('channel1', props)
  e.sender.send('channel1-response', 'Message received on channel1. Thank you!')
})

app.on('ready', () => {
  console.log('App is ready')
  console.log(app.getPath('desktop'))
  console.log(app.getPath('documents'))
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  console.log(app.getPath('userData'))
  createWindow()
})

// Electron app is ready
BrowserWindowHandler.main()

module.exports = {
  mainWindow,
  createWindow
}

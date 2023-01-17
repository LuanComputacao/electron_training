const { app, BrowserWindow } = require('electron')
const windowStateKeeper = require('electron-window-state')
const browserWindowBlur = require('./main/browser_window_blur.js')
const conf = require('./config.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automacally when the JavaScript objects is garbage collected.
let mainWindow; let secondaryWindow

// Create a new BrowserWindow when 'app' is ready
function createWindow () {
  console.log('App is ready')
  const winState = windowStateKeeper(conf.browserWindow)
  mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x,
    y: winState.y
  })

  winState.manage(mainWindow)
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  // mainWindow.loadURL('http://google.com')

  // Open DevTools  - Remove for PRODUCTION
  // mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Listen for window being closed
  mainWindow.on('close', () => {
    mainWindow = null
  })
}

// Electron app is ready
app.on('ready', () => {
  console.log('App is ready')
  console.log(app.getPath('desktop'))
  console.log(app.getPath('documents'))
  console.log(app.getPath('music'))
  console.log(app.getPath('temp'))
  console.log(app.getPath('userData'))
  createWindow()
})

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

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

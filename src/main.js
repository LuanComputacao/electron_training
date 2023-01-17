const { app, BrowserWindow, webContents } = require('electron')
const windowStateKeeper = require('electron-window-state')
const browserWindowBlur = require('./main/browser_window_blur.js')
const conf = require('./config.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automacally when the JavaScript objects is garbage collected.

// Create a new BrowserWindow when 'app' is ready
function createWindow () {
  console.log('App is ready')
  const winState = windowStateKeeper(conf.browserWindow)
  let mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x,
    y: winState.y
  })

  winState.manage(mainWindow)
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  const wc = mainWindow.webContents

  // wc.on('did-finish-load', () => {
  //   console.log('did-finish-load')
  // })

  // wc.on('dom-ready', () => {
  //   console.log('DOM Ready...')
  // })

  wc.setWindowOpenHandler((details) => {
    console.log(`Creating new window for: ${details.url}`)
    return { action: 'deny' }
  })
  // Open DevTools  - Remove for PRODUCTION
  // mainWindow.webContents.openDevTools()

  wc.on('before-input-event', (event, input) => {
    console.log(`${input.type} ${input.key}`)
    if (input.key === 'F12' && input.type === 'keyUp') {
      if (wc.isDevToolsOpened()) {
        wc.closeDevTools()
      } else {
        wc.openDevTools()
      }
    }
  })

  wc.on('context-menu', (e, params) => {
    console.log('context-menu', params)
    const seletedText = params.selectionText
    wc.executeJavaScript(`alert('${seletedText}')`)
  })

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

app.on('before-input-event', (event, input) => {
  console.log(`${input.type} ${input.key}`)
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

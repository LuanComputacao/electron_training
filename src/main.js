const electron = require('electron')
const { app, BrowserWindow, session, Menu, MenuItem } = electron
const windowStateKeeper = require('electron-window-state')
const browserWindowBlur = require('./main/browserWindowBlur.js')
const conf = require('./config.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automacally when the JavaScript objects is garbage collected.

let mainWindow

const mainMenu = Menu.buildFromTemplate(require('./main/mainMenu'))

// Create a new BrowserWindow when 'app' is ready
function createWindow () {
  console.log('App is ready')

  const winState = windowStateKeeper(conf.browserWindow)
  console.log('winState', winState)

  const customSession = session.fromPartition('persist:custom')

  mainWindow = new BrowserWindow({
    ...conf.browserWindow,
    x: winState.x,
    y: winState.y,
    webPreferences: {
      ...winState.webPreferences,
      partition: 'persist:custom'
    }
  })

  const ses = mainWindow.webContents.session
  console.log(ses)
  console.log(session.defaultSession)
  console.log(session.defaultSession.getUserAgent())
  console.log(Object.is(ses, customSession))

  winState.manage(mainWindow)

  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('index.html')
  const wc = mainWindow.webContents

  wc.on('did-finish-load', () => {
    console.log('did-finish-load')
  })

  wc.on('dom-ready', () => {
    console.log('DOM Ready...')
  })

  wc.setWindowOpenHandler((details) => {
    console.log(`Creating new window for: ${details.url}`)
    return { action: 'deny' }
  })
  // Open DevTools  - Remove for PRODUCTION
  wc.openDevTools()

  wc.on('did-finish-load', () => {
    // dialog.showOpenDialog(mainWindow, {
    //   buttonLabel: 'Select a photo',
    //   defaultPath: app.getPath('home'),
    //   properties: ['multiSelections', 'createDirectory', 'openFile', 'openDirectory']
    // }).then(result => {
    //   console.log(result)
    // })

    // const answers = ['Yes', 'No', 'Maybe']

    // dialog.showMessageBox({
    //   title: 'Message Box',
    //   message: 'Please select an option',
    //   detail: 'Message details',
    //   buttons: answers
    // }).then(result => {
    //   console.log(`User selected: ${answers[result.response]}`)
    // })
  })

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
    e.preventDefault()
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  Menu.setApplicationMenu(mainMenu)

  // Listen for window being closed
  mainWindow.on('close', () => {
    mainWindow = null
  })

  electron.powerMonitor.on('resume', () => {
    if (!mainWindow) createWindow()
  })

  electron.powerMonitor.on('suspend', () => {
    console.log('Saving some data')
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

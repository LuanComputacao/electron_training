const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automacally when the JavaScript objects is garbage collected.
let mainWindow

// Create a new BrowserWindow when 'app' is ready
function createWindow() {
    console.log("App is ready")
    mainWindow = new BrowserWindow({
        width:  1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })

    //Load index.html into the new BrowserWindow
    mainWindow.loadFile('index.html')

    // Open DevTools  - Remove for PRODUCTION
    mainWindow.webContents.openDevTools()

    //Listen for window being closed
    mainWindow.on('close', () => {
        mainWindow = null
    })
}

// Electron app is ready
app.on('ready', createWindow)

app.on('browser-window-blur', () => {
    console.log("Window is not focused")
    const browserWindowBlur = require('./browser_window_blur.js')
    browserWindowBlur.quitApp(app)
    
})

app.on('browser-window-focus', () => {
    console.log("Window is focused")
})

app.on("before-quit", e => {
    console.log("App is quitting...")
    // e.preventDefault()
})

// Quit when all windows are closed - (Not macOS- Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (mainWindow === null) createWindow()
})
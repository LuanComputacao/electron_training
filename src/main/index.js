const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automacally when the JavaScript objects is garbage collected.
let mainWindow

// Create a new BrowserWindow when 'app' is ready
function createWindow () {
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

// Quit when all windows are closed - (Not macOS- Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
    if (mainWindow === null) createWindow()
})
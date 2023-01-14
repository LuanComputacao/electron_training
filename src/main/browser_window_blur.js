const idleTime = require('../../config').idleTime

function quitApp(app) {
    setTimeout(() => {
        console.log(`Quitting app by idleing for ${idleTime}ms`)
        console.log(app)
        app.quit()
    }, idleTime)
}

module.exports = {
    quitApp
}
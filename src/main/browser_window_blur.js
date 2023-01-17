const idleTime = require('../config').idleTime

function quitApp (app) {
  setTimeout(() => {
    console.log(`Quitting app by idleing for ${idleTime}ms`)
    console.log(app)
    // App.quit()
  }, idleTime)
}

module.exports = {
  quitApp
}

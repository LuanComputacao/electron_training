const idleTime = require('../config').idleTime

function quitApp (app) {
  setTimeout(() => {
    console.log(`Quitting app by idleing for ${idleTime}ms`)
    // App.quit()
  }, idleTime)
}

module.exports = {
  quitApp
}

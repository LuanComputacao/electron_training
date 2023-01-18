const idleTime = require('../config').idleTime

function quitApp (app) {
  setTimeout(() => {
    console.log(`Quitting app by idling for ${idleTime}ms`)
    // app.quit()
  }, idleTime)
}

module.exports = {
  quitApp
}

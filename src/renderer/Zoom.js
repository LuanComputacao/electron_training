const { webFrame } = require('electron')

module.exports = {
  in: function () {
    webFrame.setZoomFactor(webFrame.getZoomFactor() + 0.1)
  },

  out: function () {
    webFrame.setZoomFactor(webFrame.getZoomFactor() - 0.1)
  },

  reset: function () {
    webFrame.setZoomFactor(1)
  }
}

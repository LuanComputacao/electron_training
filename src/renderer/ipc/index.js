const { ipcRenderer } = require('electron')

const desktopCapturer = {
  getSources: (opts) => ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts)
}

module.exports = {
  /**
   * Get each screen or an individual window that can be captured.
   * @see https://www.electronjs.org/docs/api/desktop-capturer
   */
  desktopCapturer: function () {
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
      console.log(sources)
    })
  }
}

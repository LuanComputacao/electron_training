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
  },

  screenShot: function (opts) {
    document.getElementById('screenshot-btn').addEventListener('click', () => {
      desktopCapturer.getSources(opts).then(async sources => {
        document.getElementById('screenshot').src = sources[0].thumbnail.toDataURL()
      })
    })
  },

  talk: function () {
    document.getElementById('talk-btn').addEventListener('click', e => {
      ipcRenderer.send('channel1', 'Hello from main window, channel1')
    })
  },

  talkResponse: function () {
    ipcRenderer.on('channel1-response', (e, props) => {
      console.log('channel1-response', props)
    })
  }
}

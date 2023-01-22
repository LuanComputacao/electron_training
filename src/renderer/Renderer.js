/** This file is required by the index.html file and will
 * be executed in the renderer process for that window.
 * All the Node.js APIs are available in this process.
 */

const { webFrame } = require('electron')
const Ipc = require('./ipc/index')
const NativeImageHandler = require('./NativeImageHandler')

module.exports = {
  main: function () {
    console.log('webFrame', webFrame)
    console.log('zoom factor', webFrame.getZoomFactor())
    console.log('zoom level', webFrame.getZoomLevel())

    console.log(process)
    console.log(process.getuid())
    Ipc.desktopCapturer()
    Ipc.screenShot(
      { types: ['screen'] }
    )

    Ipc.talk()
    Ipc.talkResponse()
    this.nativeImage()
  },

  nativeImage: function () {
    document.getElementById('convert-to-png')
      .addEventListener('click', (e) => {
        NativeImageHandler.toPng(e)
      })

    document.getElementById('convert-to-jpg')
      .addEventListener('click', e => {
        NativeImageHandler.toJpg(e)
      })

    document.getElementById('convert-to-tag')
      .addEventListener('click', e => {
        NativeImageHandler.toTag(document.getElementById('splash-image-preview'))
      })
  }
}

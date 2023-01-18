/** This file is required by the index.html file and will
 * be executed in the renderer process for that window.
 * All the Node.js APIs are available in this process.
 */

const { webFrame } = require('electron')
const Ipc = require('./ipc/index')

console.log('webFrame', webFrame)
console.log('zoom factor', webFrame.getZoomFactor())
console.log('zoom level', webFrame.getZoomLevel())

Ipc.desktopCapturer()
Ipc.screnShot(
  { types: ['screen'] }
)

module.exports = {
  Zoom: require('./Zoom')
}

const { ipcRenderer, nativeImage } = require('electron')
const path = require('path')

module.exports = {
  splash: nativeImage.createFromPath(path.join(__dirname, '../assets/img/logo.png')),

  async saveToDesktop (data, ext) {
    this.desktopPath = await ipcRenderer.invoke('APP_PATH')
    const fs = require('fs')
    fs.writeFile(`${this.desktopPath}/splash.${ext}`,
      data,
      (err) => {
        if (err) throw err
        console.log('The file has been saved!')
      })
  },

  toPng (e) {
    console.log('toPng')
    const pngSplash = this.splash.toPNG()
    this.saveToDesktop((pngSplash), 'png').then(r => console.log(r))
  },

  toJpg (e) {
    console.log('toJpg')
    const jpgSplash = this.splash.toJPEG(100)
    this.saveToDesktop((jpgSplash), 'jpg').then(r => console.log(r))
  },

  toTag (el) {
    console.log('toTag')
    const size = this.splash.getSize()
    el.src = this.splash
      .resize({
        width: size / 4,
        height: size / 4
      })
      .toDataURL()
  }
}

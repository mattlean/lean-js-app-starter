// @flow
const path = require('path')
const { app, BrowserWindow } = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  })

  if(process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile(path.join(__dirname, 'renderer/index.html'))
    // win.loadURL(`file://${__dirname}/renderer/index.html`)
  }
}

app.on('ready', () => {
  // if(process.env.NODE_ENV === 'development') require('devtron').install()
  createWindow()
  win.on('ready-to-show', () => win.show())
})

app.on('windows-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if(win === null) createWindow()
})

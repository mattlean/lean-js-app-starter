// @flow
const path = require('path')
const { app, BrowserWindow } = require('electron')

if(process.env.NODE_ENV === 'development') {
  var { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer')
}

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
    win.loadFile(path.join(__dirname, 'index.html'))
  }
}

app.on('ready', () => {
  if(process.env.NODE_ENV === 'development') {
    require('devtron').install()
    installExtension(REACT_DEVELOPER_TOOLS)
    installExtension(REDUX_DEVTOOLS)
  }

  createWindow()
  win.on('ready-to-show', () => win.show())
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if(win === null) createWindow()
})

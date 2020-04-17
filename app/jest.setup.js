const JSDOM = require('jsdom').JSDOM
const jsdom = new JSDOM('<!DOCTYPE html><html>...')

global.document = jsdom
global.window = document.parentWindow

global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth
  global.window.innerHeight = height || global.window.innerHeight
  global.window.dispatchEvent(new Event('resize'))
}
var localStorageMock = (function () {
  var store = {}

  return {
    getItem: function (key) {
      return store[key] || null
    },
    setItem: function (key, value) {
      store[key] = value.toString()
    },
    removeItem: function (key) {
      store[key] = null
    },
    clear: function () {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

Object.defineProperty(document.documentElement, 'offsetHeight', {
  value: 1400,
})
Object.defineProperty(document.body, 'clientHeight', {
  value: 900,
})
Object.defineProperty(document.body, 'clientWidth', {
  value: 1440,
})

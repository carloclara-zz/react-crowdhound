import React from 'react'
import Crowdhound from './lib/Crowdhound.js'

export { default as NewsFeed } from './components/NewsFeed'

export default (options) => {
  const crowdhound = new Crowdhound(options)
  Object.defineProperty(React, 'crowdhound', {
    get() {
      return crowdhound
    }
  })
}

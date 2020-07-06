import config from 'react-global-configuration'
import Crowdhound from './lib/Crowdhound.js'

class Settings {
  constructor(options) {
    const crowdhound = new Crowdhound(options)
    config.set({ crowdhound })
  }
}

export default Settings

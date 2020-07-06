import React from 'react'

import Crowdhound, { NewsFeed } from 'react-crowdhound'
import 'react-crowdhound/dist/index.css'

const options = {
  version: '2.0',
  protocol: 'http',
  host: 'uat.crowdhound.io',
  port: 80,
  apikey: 'API14ICABHVWQWVQMUTWOULMU58IX',
  debug: true,
}

Crowdhound(options)

const App = () => {
  return <div>    
    <NewsFeed elementId="284014" />
  </div>
}

export default App

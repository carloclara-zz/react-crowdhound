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

// const userData = { userId: 'cclara', name: 'Carlo Clara' }
const userData = { userId: 'wendell', name: 'Wendell Ramos' }
// const userData = { userId: 'jonsnow', name: 'Jon Snow' }

const App = () => {
  return <div>    
    <NewsFeed anchorId="284816" userData={userData} />
  </div>
}

export default App

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

const userData = { userId: 'cclara', name: 'Carlo Clara' }
// const userData = { userId: 'rssibug', name: 'Rs Sibug' }
// const userData = { userId: 'jonsnow', name: 'Jon Snow' }

const styles = {
  appBodyStyle: {
    // backgroundColor: '#ccd0d5'
  },
  formWrapperStyle: {
    // backgroundColor: '#ffffff'
  },
  formTextAreaStyle: {
    // color: 'red'
  },
  primaryAvatarStyle: {
    // borderRadius: '50%'
  },
  secondaryAvatarStyle: {
    // borderRadius: '40%'
  },
  buttonStyle: {
    // color: '#FFF',
    // backgroundColor: '#FF4785',
    // border: '1px solid #FF4785'
  },
  postUsernameStyle: {
    // color: 'yellow'
  },
  postDateStyle: {
    // color: 'blue'
  },
  postDescriptionStyle: {
    // color: 'pink'
  },
  commentUsernameStyle: {
    // color: 'pink'
  },
  commentDateStyle: {
    // color: 'green'
  },
  commentDescriptionStyle: {
    // color: 'red'
  },
  likedStyle: {
    // color: '#FF4785'
  },
  commentInputStyle: {
    // color: 'cyan'
  }
}

const App = () => {
  return <div>    
    <NewsFeed anchorId="284816" userData={userData} styles={styles} />
  </div>
}

export default App

# react-crowdhound

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-crowdhound.svg)](https://www.npmjs.com/package/react-crowdhound) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-crowdhound
```

## Usage

```jsx
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

const userData = { userId: 'johnjoe', name: 'John Joe' }

const styles = {
  appBodyStyle: {
    // some css styling
  },
  formWrapperStyle: {
    // some css styling
  },
  formTextAreaStyle: {
    // some css styling
  },
  primaryAvatarStyle: {
    // some css styling
  },
  secondaryAvatarStyle: {
    // some css styling
  },
  buttonStyle: {
    // some css styling
  },
  postUsernameStyle: {
    // some css styling
  },
  postDateStyle: {
    // some css styling
  },
  postDescriptionStyle: {
    // some css styling
  },
  commentUsernameStyle: {
    // some css styling
  },
  commentDateStyle: {
    // some css styling
  },
  commentDescriptionStyle: {
    // some css styling
  },
  likedStyle: {
    // some css styling
  },
  commentInputStyle: {
    // some css styling
  }
}

const App = () => {
  return <div>    
    <NewsFeed anchorId="284816" userData={userData} styles={styles} />
  </div>
}

export default App
```

## License

MIT © [](https://github.com/)

import React from 'react'
import NewsFeedSingle from './NewsFeedSingle'

const NewsFeedList = ({ elements = [] }) => {
  return (
    <div>
      {elements.map((element, key) => (
        <NewsFeedSingle element={element} key={key} />
      ))}
    </div>
  )
}

export default NewsFeedList

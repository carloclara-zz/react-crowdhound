import React from 'react'
import NewsFeedSingle from './NewsFeedSingle'

const NewsFeedList = ({ elements = [], userData }) => {
  return (
    <div>
      {elements.map((element, key) => (
        <NewsFeedSingle userData={userData} element={element} key={key} />
      ))}
    </div>
  )
}

export default NewsFeedList

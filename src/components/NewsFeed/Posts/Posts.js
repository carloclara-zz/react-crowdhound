import React from 'react'
import PostSingle from './PostSingle'

const Posts = ({ elements = [], userData }) => {
  return (
    <div>
      {elements.map((element, key) => (
        <PostSingle userData={userData} element={element} key={key} />
      ))}
    </div>
  )
}

export default Posts

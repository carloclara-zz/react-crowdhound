import React from 'react'
import PostSingle from './PostSingle'

const Posts = ({ elements = [], userData, styles }) => {
  return (
    <div>
      {elements.map((element, key) => (
        <PostSingle
          userData={userData}
          element={element}
          key={key}
          styles={styles}
        />
      ))}
    </div>
  )
}

export default Posts

import React from 'react'
import CommentSingle from './CommentSingle'

const Comments = ({ elements = [], userData, styles }) => {
  elements.sort(function (a, b) {
    return a.id - b.id
  })
  return (
    <div>
      {elements.map((element, key) => (
        <CommentSingle
          userData={userData}
          element={element}
          key={key}
          styles={styles}
        />
      ))}
    </div>
  )
}

export default Comments

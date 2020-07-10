import React from 'react'
import CommentSingle from './CommentSingle'

const Comments = ({ elements = [], userData }) => {
  elements.sort(function (a, b) {
    return a.id - b.id
  })
  return (
    <div>
      {elements.map((element, key) => (
        <CommentSingle userData={userData} element={element} key={key} />
      ))}
    </div>
  )
}

export default Comments

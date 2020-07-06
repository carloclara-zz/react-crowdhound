import React from 'react'
import CommentSingle from './CommentSingle'

const Comments = ({ elements = [] }) => {
  return (
    <div>
      {elements.map((element, key) => (
        <CommentSingle element={element} key={key} />
      ))}
    </div>
  )
}

export default Comments

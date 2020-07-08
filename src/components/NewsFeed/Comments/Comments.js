import React from 'react'
import CommentSingle from './CommentSingle'

const Comments = ({ elements = [], userData }) => {
  return (
    <div>
      {elements.map((element, key) => (
        <CommentSingle userData={userData} element={element} key={key} />
      ))}
    </div>
  )
}

export default Comments

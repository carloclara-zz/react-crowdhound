import React from 'react'

const NotificationCounter = ({
  element = {},
  userData = {},
  label = 'Reply',
  likeComment,
  showReplyTextBox = () => {}
}) => {
  let likesProperties = {}
  try {
    likesProperties = JSON.parse(element.extraProperties) || {}
  } catch (e) {
    // do nothing
  }
  let totalLikes = 0
  let filteredUserLike = []
  const namesToolTip = []
  if (likesProperties.likes) {
    totalLikes = likesProperties.likes.length
    // Check if the current user already liked the comment
    filteredUserLike = likesProperties.likes.filter((obj) => {
      return obj.userId === userData.userId
    })
    // Collect all names who've liked the comment
    likesProperties.likes.forEach((obj) => {
      namesToolTip.push(obj.name)
    })
  }
  const totalComments = element.children.length
  return (
    <div>
      <div className='ch-notification-wrapper'>
        {totalLikes > 0 && (
          <span title={namesToolTip.join()}>
            {totalLikes} {totalLikes > 1 ? 'Likes' : 'Like'}
          </span>
        )}
        {totalComments > 0 && (
          <span>
            {totalComments} {totalComments > 1 ? 'Comments' : 'Comment'}
          </span>
        )}
      </div>
      <div className='ch-notification-action-wrapper'>
        <label
          onClick={() => likeComment(element)}
          className={filteredUserLike.length > 0 ? 'liked' : ''}
        >
          Like
        </label>
        <label
          htmlFor={element.id}
          onClick={() => {
            showReplyTextBox(true)
          }}
        >
          {label}
        </label>
      </div>
    </div>
  )
}

export default NotificationCounter

import React from 'react'

const NotificationCounter = ({
  element = {},
  userData = {},
  htmlFor = '',
  label = 'Reply',
  likeComment
}) => {
  let summaryProperties = {}
  try {
    summaryProperties = JSON.parse(element.summary) || {}
  } catch (e) {
    // do nothing
  }
  let totalLikes = 0
  let filteredUserLike = []
  const namesToolTip = []
  if (summaryProperties.likes) {
    totalLikes = summaryProperties.likes.length
    // Check if the current user already liked the comment
    filteredUserLike = summaryProperties.likes.filter((obj) => {
      return obj.userId === userData.userId
    })
    // Collect all names who've liked the comment
    summaryProperties.likes.forEach((obj) => {
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
        <label htmlFor={htmlFor}>{label}</label>
      </div>
    </div>
  )
}

export default NotificationCounter

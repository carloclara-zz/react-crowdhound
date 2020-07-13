import React from 'react'
import anonymousAvatar from '../../../assets/images/anonymous-avatar.png'

const WriteComment = ({
  element = {},
  styles = {},
  comment = '',
  setComment,
  insertComment,
  showReplyTextBox = () => {}
}) => {
  const { secondaryAvatarStyle, commentInputStyle } = styles
  return (
    <table className='ch-news-feed-comment-table'>
      <tbody>
        <tr>
          <td className='left-cell'>
            <img
              className='ch-news-feed-secondary-avatar'
              src={anonymousAvatar}
              style={{ ...secondaryAvatarStyle }}
            />
          </td>
          <td className='right-cell'>
            <input
              id={element.id}
              className='ch-news-feed-write-comments-text-box'
              type='text'
              placeholder='Write a comment...'
              value={comment}
              style={{ ...commentInputStyle }}
              onKeyUp={(e) => insertComment(e, element)}
              onChange={(e) => {
                setComment(e.target.value)
              }}
              onBlur={() => {
                setTimeout(() => {
                  showReplyTextBox()
                }, 200)
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default WriteComment

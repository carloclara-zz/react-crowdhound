import React from 'react'
import anonymousAvatar from '../../../assets/images/anonymous-avatar.png'

const WriteComment = ({
  element = {},
  comment = '',
  setComment,
  insertComment,
  showReplyTextBox = () => {}
}) => {
  return (
    <table className='ch-comments-maintable'>
      <tbody>
        <tr>
          <td className='ch-comments-left-cell'>
            <img className='ch-comments-avatar' src={anonymousAvatar} />
          </td>
          <td className='ch-comments-right-cell'>
            <input
              id={element.id}
              className='ch-comments-textbox'
              type='text'
              placeholder='Write a comment...'
              value={comment}
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

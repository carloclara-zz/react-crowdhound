import React, { useEffect, useState, crowdhound } from 'react'
import ShowMore from 'react-show-more'
import Comments from './Comments'
import anonymousAvatar from '../../../assets/images/anonymous-avatar.png'

const CommentSingle = ({ element = {} }) => {
  const [comment, setComment] = useState('')
  const insertComment = async (e, parentId) => {
    if (e.keyCode === 13) {
      const payload = {
        id: null,
        rootId: '$samplenewsfeed',
        parentId: parentId,
        type: 'newsFeedChildComment',
        description: comment,
        status: 'active',
        deleted: 'false'
      }
      const reply = await crowdhound.create(this, payload)
      console.log('child comment:', payload)
      setComment('')
    }
  }
  const notificationCounter = (element) => {
    const extraProperties = JSON.parse(element.extraProperties) || {}
    console.log('extraProperties: ', extraProperties)
    let totalLikes = 0
    if (extraProperties.likes) {
      totalLikes = extraProperties.likes.length
    }
    const totalComments = element.children.length
    return (
      <div className='ch-notification-wrapper'>
        {totalLikes > 0 && (
          <div>
            {totalLikes} {totalLikes > 1 ? 'Likes' : 'Like'}
          </div>
        )}
        {totalComments > 0 && (
          <div>
            {totalComments} {totalComments > 1 ? 'Comments' : 'Comment'}
          </div>
        )}
      </div>
    )
  }
  return (
    <div>
      <table className='ch-comments-maintable'>
        <tbody>
          <tr>
            <td className='ch-comments-left-cell'>
              <img className='ch-comments-avatar' src={anonymousAvatar} />
            </td>
            <td className='ch-comments-right-cell'>
              <span className='ch-comments-userid'>
                {element.userId === '0' ? 'Unknown' : element.userId}
              </span>
              <div className='ch-comments-description'>
                <ShowMore
                  lines={3}
                  more='See More'
                  less='See Less'
                  anchorClass='ch-see-more-content'
                >
                  <p>{element.description}</p>
                </ShowMore>
              </div>
              {notificationCounter(element)}
              <div className='ch-action-cell'>
                <label>Like</label>
                <label
                  htmlFor={
                    element.type === 'newsFeedComment'
                      ? element.id
                      : element.parentId
                  }
                >
                  Reply
                </label>
              </div>
              <Comments elements={element.children} />
              {element.type === 'newsFeedComment' && (
                <div>
                  <table className='ch-comments-maintable'>
                    <tbody>
                      <tr>
                        <td className='ch-comments-left-cell'>
                          <img
                            className='ch-comments-avatar'
                            src={anonymousAvatar}
                          />
                        </td>
                        <td className='ch-comments-right-cell'>
                          <input
                            id={element.id}
                            className='ch-comments-textbox'
                            type='text'
                            placeholder='Write a comment...'
                            value={comment}
                            onKeyUp={(e) => insertComment(e, element.id)}
                            onChange={(e) => {
                              setComment(e.target.value)
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CommentSingle

import React, { useState, crowdhound } from 'react'
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
      console.log('comment payload:', payload)
      setComment('')
    }
  }
  const likeComment = async ({
    id,
    rootId,
    parentId,
    description,
    extraProperties
  }) => {
    const parsedExtraProperties = JSON.parse(extraProperties) || {}
    const likes = parsedExtraProperties.likes || []
    likes.push({ userId: 'johnjoe', name: 'John Joe' })
    const payload = {
      id,
      rootId,
      parentId,
      description,
      extraProperties: JSON.stringify({ likes })
    }
    const reply = await crowdhound.update(this, payload)
    console.log('like payload: ', payload)
  }
  const notificationCounter = (element) => {
    const extraProperties = JSON.parse(element.extraProperties) || {}
    let totalLikes = 0
    let activeLike = ''
    const namesToopTip = []
    if (extraProperties.likes) {
      totalLikes = extraProperties.likes.length
      const filteredUserLike = extraProperties.likes.filter((obj) => {
        return obj.userId === 'johnjoe'
      })
      if (filteredUserLike.length > 0) {
        activeLike = 'liked'
      }
      extraProperties.likes.forEach((obj) => {
        namesToopTip.push(obj.name)
      })
    }
    const totalComments = element.children.length
    return (
      <div>
        <div className='ch-notification-wrapper'>
          {totalLikes > 0 && (
            <span title={namesToopTip.join()}>
              {totalLikes} {totalLikes > 1 ? 'Likes' : 'Like'}
            </span>
          )}
          {totalComments > 0 && (
            <span>
              {totalComments} {totalComments > 1 ? 'Comments' : 'Comment'}
            </span>
          )}
        </div>
        <div className='ch-action-cell'>
          <label onClick={() => likeComment(element)} className={activeLike}>
            Like
          </label>
          <label
            htmlFor={
              element.type === 'newsFeedComment' ? element.id : element.parentId
            }
          >
            Reply
          </label>
        </div>
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

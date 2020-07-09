import React, { useEffect, useState, crowdhound } from 'react'
import moment from 'moment'
import ShowMore from 'react-show-more'
import Comments from './Comments'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'
import moreIcon from '../../assets/images/icons/more.svg'

const NewsFeedSingle = ({ element = {}, userData = {} }) => {
  const [data, setData] = useState(element)
  const [comment, setComment] = useState('')
  const [showEditBox, setShowEdit] = useState(false)
  const [editableComment, setEditableComment] = useState('')
  useEffect(() => {
    setData(element)
  }, [element])
  const insertComment = async (e, parentId) => {
    if (e.keyCode === 13 && comment.trim().length > 0) {
      const payload = {
        id: null,
        rootId: parentId,
        parentId: parentId,
        type: 'newsFeedComment',
        extraProperties: userData.userId,
        title: userData.name,
        description: comment,
        status: 'active',
        deleted: 'false'
      }
      console.log('comment:', payload)
      const createReponse = await crowdhound.create(this, payload)
      console.log('createReponse:', createReponse)

      const selectResponse = await crowdhound.select(this, {
        elementId: parentId,
        withChildren: true
      })
      console.log('selectResponse:', selectResponse)
      if (selectResponse.elements[0]) {
        setData(selectResponse.elements[0])
      }
      setComment('')
    }
  }

  const updateComment = async (e, element) => {
    if (e.keyCode === 13 && editableComment.trim().length > 0) {
      const { id, rootId, parentId } = element
      const payload = {
        id,
        rootId,
        parentId,
        description: editableComment
      }
      console.log('comment:', payload)
      const updateReponse = await crowdhound.update(this, payload)
      console.log('updateReponse:', updateReponse)

      const selectResponse = await crowdhound.select(this, {
        elementId: id,
        withChildren: true
      })
      console.log('selectResponse:', selectResponse)
      if (selectResponse.elements[0]) {
        setData(selectResponse.elements[0])
      }
      setShowEdit(false)
    }
  }

  const deleteComment = async ({ id, rootId, parentId, description }) => {
    const payload = {
      id,
      rootId,
      parentId,
      description,
      status: 'deleted',
      deleted: 'true'
    }
    console.log('delete comment:', payload)
    const updateReponse = await crowdhound.update(this, payload)
    console.log('updateReponse:', updateReponse)
  }

  const likeComment = async ({
    id,
    rootId,
    parentId,
    description,
    summary
  }) => {
    let summaryProperties = {}
    try {
      summaryProperties = JSON.parse(summary) || {}
    } catch (e) {
      // do nothing
    }
    const likes = summaryProperties.likes || []
    // Prevent duplicate user inserts
    const filteredLikes = likes.filter((obj) => {
      return obj.userId !== userData.userId
    })
    // Insert new object if is not existing in the 'likes' array
    if (likes.length === filteredLikes.length) {
      filteredLikes.push({ userId: userData.userId, name: userData.name })
    }
    const payload = {
      id,
      rootId,
      parentId,
      description,
      summary: JSON.stringify({ likes: filteredLikes })
    }
    console.log('like payload: ', payload)
    await crowdhound.update(this, payload)

    const selectResponse = await crowdhound.select(this, {
      elementId: id,
      withChildren: true
    })
    console.log('selectResponse:', selectResponse)
    if (selectResponse.elements[0]) {
      setData(selectResponse.elements[0])
    }
  }

  const notificationCounter = (element) => {
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
          <label htmlFor={element.id}>Comment</label>
        </div>
      </div>
    )
  }

  const dateFromNow = (date) => {
    return moment(date * 1000).fromNow()
  }

  return (
    <div className='ch-newsfeed-main-wrapper'>
      <div className='ch-newsfeed-wrapper'>
        {userData.userId === data.title && (
          <div className='ch-options-wrapper'>
            <img className='ch-more-icon' src={moreIcon} />
            <div className='ch-options-actions-wrapper'>
              <div className='ch-options-actions'>
                <span
                  onClick={() => {
                    setShowEdit(true)
                    setEditableComment(data.description)
                  }}
                >
                  Edit
                </span>
                <span
                  onClick={() => {
                    deleteComment(data)
                  }}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        )}
        <table className='ch-newsfeed-maintable'>
          <tbody>
            <tr>
              <td className='ch-newsfeed-left-cell'>
                <img className='ch-newsfeed-avatar' src={anonymousAvatar} />
              </td>
              <td className='ch-newsfeed-right-cell'>
                <span className='ch-newsfeed-userid'>
                  {data.title ? data.title : 'Unknown'}
                </span>
                <span className='ch-newsfeed-date'>
                  {dateFromNow(data.created)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='ch-newsfeed-description'>
          {showEditBox && (
            <div className='ch-editable-comments-wrapper'>
              <input
                type='text'
                className='ch-comments-textbox'
                value={editableComment}
                onKeyUp={(e) => updateComment(e, data)}
                onChange={(e) => {
                  setEditableComment(e.target.value)
                }}
              />
              <button
                onClick={() => {
                  setShowEdit(false)
                }}
              >
                Cancel
              </button>
            </div>
          )}
          {!showEditBox && (
            <ShowMore
              lines={3}
              more='See More'
              less='See Less'
              anchorClass='ch-see-more-content'
            >
              <p>{data.description}</p>
            </ShowMore>
          )}
        </div>
        {notificationCounter(data)}
        <Comments elements={data.children} userData={userData} />
        <table className='ch-comments-maintable'>
          <tbody>
            <tr>
              <td className='ch-comments-left-cell'>
                <img className='ch-comments-avatar' src={anonymousAvatar} />
              </td>
              <td className='ch-comments-right-cell'>
                <input
                  id={data.id}
                  className='ch-comments-textbox'
                  type='text'
                  placeholder='Write a comment...'
                  value={comment}
                  onKeyUp={(e) => insertComment(e, data.id)}
                  onChange={(e) => {
                    setComment(e.target.value)
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default NewsFeedSingle

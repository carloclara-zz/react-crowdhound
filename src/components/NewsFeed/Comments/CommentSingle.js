import React, { useEffect, useState } from 'react'
import moment from 'moment'
import ShowMore from 'react-show-more'
import Comments from './Comments'
import {
  getContent,
  addContent,
  editContent,
  deleteContent,
  likeContent
} from '../../../actions/content'
import anonymousAvatar from '../../../assets/images/anonymous-avatar.png'
import moreIcon from '../../../assets/images/icons/more.svg'

const CommentSingle = ({ element = {}, userData = {} }) => {
  const [data, setData] = useState(element)
  const [comment, setComment] = useState('')
  const [showEditableTextBox, setShowEditableTextBox] = useState(false)
  const [editedComment, setEditedComment] = useState('')
  useEffect(() => {
    setData(element)
  }, [element])
  const insertComment = async (e, { rootId, id }) => {
    if (e.keyCode === 13 && comment.trim().length > 0) {
      await addContent(userData, rootId, id, comment, `child-comment-${id}`)
      const comments = await getContent(id)
      if (comments.elements[0]) {
        setData(comments.elements[0])
      }
      setComment('')
    }
  }

  const deleteComment = async (element) => {
    await deleteContent(element)
  }

  const updateComment = async (e, element) => {
    if (e.keyCode === 13 && editedComment.trim().length > 0) {
      await editContent(element, editedComment)
      const posts = await getContent(element.id)
      if (posts.elements[0]) {
        setData(posts.elements[0])
      }
      setShowEditableTextBox(false)
    }
  }

  const likeComment = async (elementId) => {
    await likeContent(userData, elementId)
    const posts = await getContent(element.id)
    if (posts.elements[0]) {
      setData(posts.elements[0])
    }
  }

  // prevent user to write comment on the child comment
  const showWriteAComment = (typeValue) => {
    return typeValue.indexOf('child-comment') === -1
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
          <label
            htmlFor={
              showWriteAComment(element.type) ? element.id : element.parentId
            }
          >
            Reply
          </label>
        </div>
      </div>
    )
  }

  return (
    <div className='ch-comments-wrapper'>
      {userData.userId === data.extraProperties && (
        <div className='ch-options-wrapper'>
          <img className='ch-more-icon' src={moreIcon} />
          <div className='ch-options-actions-wrapper'>
            <div className='ch-options-actions'>
              <span
                onClick={() => {
                  setShowEditableTextBox(true)
                  setEditedComment(data.description)
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
      <table className='ch-comments-maintable'>
        <tbody>
          <tr>
            <td className='ch-comments-left-cell'>
              <img className='ch-comments-avatar' src={anonymousAvatar} />
            </td>
            <td className='ch-comments-right-cell'>
              <span className='ch-comments-userid'>
                {data.title ? data.title : 'Unknown'}
              </span>
              <span className='ch-comments-date'>
                {moment(data.created * 1000).fromNow()}
              </span>
              <div className='ch-comments-description'>
                {showEditableTextBox && (
                  <div className='ch-editable-comments-wrapper'>
                    <input
                      type='text'
                      className='ch-comments-textbox'
                      value={editedComment}
                      onKeyUp={(e) => updateComment(e, data)}
                      onChange={(e) => {
                        setEditedComment(e.target.value)
                      }}
                    />
                    <button
                      onClick={() => {
                        setShowEditableTextBox(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {!showEditableTextBox && (
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
              {showWriteAComment(data.type) && (
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
                            id={data.id}
                            className='ch-comments-textbox'
                            type='text'
                            placeholder='Write a comment...'
                            value={comment}
                            onKeyUp={(e) => insertComment(e, data)}
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

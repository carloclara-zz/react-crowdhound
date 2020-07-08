import React, { useEffect, useState, crowdhound } from 'react'
import moment from 'moment'
import ShowMore from 'react-show-more'
import Comments from './Comments'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'

const NewsFeedSingle = ({ element = {} }) => {
  const [data, setData] = useState(element)
  const [comment, setComment] = useState('')
  useEffect(() => {
    setData(element)
  }, [element])
  const insertComment = async (e, parentId) => {
    if (e.keyCode === 13) {
      const payload = {
        id: null,
        rootId: '$samplenewsfeed',
        parentId: parentId,
        type: 'newsFeedComment',
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

  const likeComment = async ({
    id,
    rootId,
    parentId,
    description,
    extraProperties
  }) => {
    const parsedExtraProperties = JSON.parse(extraProperties) || {}
    const likes = parsedExtraProperties.likes || []
    // Prevent duplicate user inserts
    const filteredLikes = likes.filter((obj) => {
      return obj.userId !== 'johnjoe'
    })
    // Insert new object if is not existing in the 'likes' array
    if (likes.length === filteredLikes.length) {
      filteredLikes.push({ userId: 'johnjoe', name: 'John Joe' })
    }
    const payload = {
      id,
      rootId,
      parentId,
      description,
      extraProperties: JSON.stringify({ likes: filteredLikes })
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
    const extraProperties = JSON.parse(element.extraProperties) || {}
    let totalLikes = 0
    let filteredUserLike = []
    const namesToolTip = []
    if (extraProperties.likes) {
      totalLikes = extraProperties.likes.length
      // Check if the current user already liked the comment
      filteredUserLike = extraProperties.likes.filter((obj) => {
        return obj.userId === 'johnjoe'
      })
      // Collect all names who've liked the comment
      extraProperties.likes.forEach((obj) => {
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
        <div className='ch-action-wrapper'>
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
    <div className='ch-newsfeed-wrapper'>
      <table className='ch-newsfeed-maintable'>
        <tbody>
          <tr>
            <td className='ch-newsfeed-left-cell'>
              <img className='ch-newsfeed-avatar' src={anonymousAvatar} />
            </td>
            <td className='ch-newsfeed-right-cell'>
              <span className='ch-newsfeed-userid'>
                {data.userId === '0' ? 'Unknown' : data.userId}
              </span>
              <span className='ch-newsfeed-date'>
                {dateFromNow(data.created)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div className='ch-newsfeed-description'>
        <ShowMore
          lines={3}
          more='See More'
          less='See Less'
          anchorClass='ch-see-more-content'
        >
          <p>{data.description}</p>
        </ShowMore>
      </div>
      {notificationCounter(data)}
      <Comments elements={data.children} />
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
  )
}

export default NewsFeedSingle

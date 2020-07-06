import React, { useEffect, useState, crowdhound } from 'react'
import moment from 'moment'
import ShowMore from 'react-show-more'
import Comments from './Comments'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'

const NewsFeedSingle = ({ element = {} }) => {
  const [comment, setComment] = useState('')
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
      const reply = await crowdhound.create(this, payload)
      console.log('comment:', payload)
      setComment('')
    }
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
                {element.userId === '0' ? 'Unknown' : element.userId}
              </span>
              <span className='ch-newsfeed-date'>
                {dateFromNow(element.created)}
              </span>
            </td>
          </tr>
          <tr>
            <td colSpan='2' className='ch-newsfeed-description'>
              <ShowMore
                lines={3}
                more='See More'
                less='See Less'
                anchorClass='ch-see-more-content'
              >
                <p>{element.description}</p>
              </ShowMore>
            </td>
          </tr>
          <tr>
            <td colSpan='2' className='ch-action-cell'>
              <label>Like</label>
              <label htmlFor={element.id}>Comment</label>
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
              <Comments elements={element.children} />
            </td>
          </tr>
          <tr>
            <td colSpan='2'>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default NewsFeedSingle

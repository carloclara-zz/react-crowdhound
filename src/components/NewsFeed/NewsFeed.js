import React, { useEffect, useState, crowdhound } from 'react'
import NewsFeedList from './NewsFeedList'
import './NewsFeed.scss'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'

export default ({ elementId, userData = {} }) => {
  const [post, setPost] = useState('')
  const [element, setElement] = useState({})

  const insertPost = async () => {
    if (post.trim().length > 0) {
      const payload = {
        id: null,
        rootId: elementId,
        parentId: elementId,
        type: 'newsFeed',
        extraProperties: userData.userId,
        title: userData.name,
        description: post,
        status: 'active'
      }
      await crowdhound.create(this, payload)
      setPost('')
      selectPost()
    }
  }

  const selectPost = async () => {
    const reply = await crowdhound.select(this, {
      elementId,
      withChildren: true,
      status: 'active'
    })
    if (reply.elements[0]) {
      setElement(reply.elements[0])
    }
  }

  useEffect(() => {
    selectPost()
  }, [])
  return (
    <div id='app-ch-newsfeed'>
      <div className='ch-newsfeed-form-wrapper'>
        <table className='ch-newsfeed-maintable'>
          <tbody>
            <tr>
              <td className='ch-newsfeed-left-cell'>
                <img className='ch-newsfeed-avatar' src={anonymousAvatar} />
              </td>
              <td className='ch-newsfeed-right-cell'>
                <span className='ch-newsfeed-userid'>
                  {userData.name ? userData.name : 'Unknown'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <textarea
          className='ch-newsfeed-post-textarea'
          placeholder={`What's on your mind?`}
          value={post}
          onChange={(e) => {
            setPost(e.target.value)
          }}
        />
        <button onClick={insertPost}>POST</button>
      </div>
      <NewsFeedList elements={element.children} userData={userData} />
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import Posts from './Posts'
import { getContent, addContent } from '../../actions/content'
import './NewsFeed.scss'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'

export default ({ anchorId, userData = {} }) => {
  const [post, setPost] = useState('')
  const [element, setElement] = useState({})

  const insertPost = async () => {
    if (post.trim().length > 0) {
      await addContent(userData, anchorId, anchorId, post, `post-${anchorId}`)
      setPost('')
      selectPosts()
    }
  }

  const selectPosts = async () => {
    const posts = await getContent(anchorId)
    if (posts.elements[0]) {
      setElement(posts.elements[0])
    }
  }

  useEffect(() => {
    selectPosts()
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
      <Posts elements={element.children} userData={userData} />
    </div>
  )
}

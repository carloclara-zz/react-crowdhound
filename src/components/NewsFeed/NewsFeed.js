import React, { useEffect, useState } from 'react'
import Posts from './Posts'
import { getContent, addContent } from '../../actions/content'
import './NewsFeed.scss'
import anonymousAvatar from '../../assets/images/anonymous-avatar.png'

export default ({ anchorId, userData = {}, styles = {} }) => {
  const {
    appBodyStyle,
    formWrapperStyle,
    formTextAreaStyle,
    buttonStyle
  } = styles
  const { primaryAvatarStyle } = styles
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
    <div id='app-ch-news-feed' style={{ ...appBodyStyle }}>
      <div
        className='ch-news-feed-form-wrapper'
        style={{ ...formWrapperStyle }}
      >
        <table className='ch-news-feed-main-table'>
          <tbody>
            <tr>
              <td className='left-cell'>
                <img
                  className='ch-news-feed-primary-avatar'
                  style={{ ...primaryAvatarStyle }}
                  src={anonymousAvatar}
                />
              </td>
              <td className='right-cell'>
                <span className='ch-news-feed-element-user-id'>
                  {userData.name ? userData.name : 'Unknown'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <textarea
          className='ch-news-feed-post-textarea'
          placeholder={`What's on your mind?`}
          value={post}
          style={{ ...formTextAreaStyle }}
          onChange={(e) => {
            setPost(e.target.value)
          }}
        />
        <button style={{ ...buttonStyle }} onClick={insertPost}>
          POST
        </button>
      </div>
      <Posts elements={element.children} userData={userData} styles={styles} />
    </div>
  )
}

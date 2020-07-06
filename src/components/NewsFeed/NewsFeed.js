import React, { useEffect, useState, crowdhound } from 'react'
import NewsFeedList from './NewsFeedList'
import './NewsFeed.scss'

export default ({ elementId }) => {
  const [createdElement, setCreatedElement] = useState('')
  const [post, setPost] = useState('')
  const [element, setElement] = useState({})

  const insertPost = async () => {
    if (post.trim().length > 0) {
      const payload = {
        id: null,
        rootId: '$samplenewsfeed',
        parentId: '$samplenewsfeed',
        type: 'newsFeed',
        title: 'Test News Feed',
        description: post,
        status: 'active',
        deleted: 'false'
      }
      const reply = await crowdhound.create(this, payload)
      setCreatedElement(reply)
      setPost('')
    }
  }

  useEffect(() => {
    async function selectFunction() {
      const reply = await crowdhound.select(this, {
        elementId,
        withChildren: true
      })
      if (reply.elements[0]) {
        setElement(reply.elements[0])
      }
    }
    selectFunction()
  }, [createdElement])
  return (
    <div id='app-ch-newsfeed'>
      <div className='ch-newsfeed-form-wrapper'>
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
      <NewsFeedList elements={element.children} />
    </div>
  )
}

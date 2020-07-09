import { crowdhound } from 'react'

export const getContent = async (elementId) => {
  try {
    const elements = await crowdhound.select(this, {
      elementId,
      withChildren: true,
      status: 'active'
    })
    return elements
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addContent = async (
  userData,
  rootId,
  parentId,
  description,
  type
) => {
  try {
    const payload = {
      id: null,
      rootId,
      parentId,
      type,
      extraProperties: userData.userId,
      title: userData.name,
      description,
      status: 'active'
    }
    await crowdhound.create(this, payload)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const editContent = async (element, description) => {
  const { id, rootId, parentId } = element
  try {
    const payload = {
      id,
      rootId,
      parentId,
      description
    }
    await crowdhound.update(this, payload)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteContent = async (element) => {
  const { id, rootId, parentId, description } = element
  try {
    const payload = {
      id,
      rootId,
      parentId,
      description,
      status: 'deleted',
      deleted: 'true'
    }
    await crowdhound.update(this, payload)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const likeContent = async (userData, element) => {
  try {
    const { id, rootId, parentId, description, summary } = element
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
    await crowdhound.update(this, payload)
  } catch (error) {
    console.log(error)
    throw error
  }
}

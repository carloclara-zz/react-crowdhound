import React from 'react'
import moreIcon from '../../../assets/images/icons/more.svg'

const MoreActions = ({
  element = {},
  deleteComment,
  showEditableTextBox,
  setDescription
}) => {
  return (
    <div className='ch-news-feed-more-options-wrapper'>
      <img className='more-options-icon' src={moreIcon} />
      <div className='more-options-action-wrapper'>
        <div className='more-options-action'>
          <span
            onClick={() => {
              showEditableTextBox(true)
              setDescription(element.description)
            }}
          >
            Edit
          </span>
          <span
            onClick={() => {
              deleteComment(element)
            }}
          >
            Delete
          </span>
        </div>
      </div>
    </div>
  )
}

export default MoreActions

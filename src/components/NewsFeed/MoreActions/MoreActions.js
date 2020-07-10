import React from 'react'
import moreIcon from '../../../assets/images/icons/more.svg'

const MoreActions = ({
  element = {},
  deleteComment,
  showEditableTextBox,
  setDescription
}) => {
  return (
    <div className='ch-options-wrapper'>
      <img className='ch-more-icon' src={moreIcon} />
      <div className='ch-options-actions-wrapper'>
        <div className='ch-options-actions'>
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

/* eslint-disable jsx-a11y/control-has-associated-label */
// Write your code here

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, onLiked, onDeleteComment} = props
  const {id, name, comment, backgroundColor, isLiked} = commentDetails
  const logo = name[0].toUpperCase()

  const logoStyle = `logo ${backgroundColor}`

  const onLike = () => {
    onLiked(id)
  }

  const onDelete = () => {
    onDeleteComment(id)
  }
  const time = formatDistanceToNow(new Date())

  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeText = isLiked ? `like liked` : `like`

  return (
    <li className="list-item">
      <div className="logo-container">
        <p className={logoStyle}>{logo}</p>
        <div className="comment-container">
          <div className="name-time-container">
            <p className="name">{name}</p>
            <p className="time">{time}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-container">
        <div className="like-container">
          <button onClick={onLike} type="button" className="button">
            <img className="like-img" src={likeImg} alt="like" />
          </button>
          <p className={likeText}>Like</p>
        </div>
        <button
          data-testid="delete"
          onClick={onDelete}
          type="button"
          className="button"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem

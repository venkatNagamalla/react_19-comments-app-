import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  getName = event => {
    this.setState({name: event.target.value})
  }

  onLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state

    const filterList = commentsList.filter(eachComment => eachComment.id !== id)

    this.setState({commentsList: filterList})
  }

  getComment = event => {
    this.setState({comment: event.target.value})
  }

  getNameComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const backgroundColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      backgroundColor,
      isLiked: false,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  renderItem = () => {
    const {commentsList} = this.state
    return commentsList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        onLiked={this.onLiked}
        commentDetails={eachComment}
        onDeleteComment={this.onDeleteComment}
      />
    ))
  }

  render() {
    const {name, comment, commentsList} = this.state

    return (
      <div className="bg-container">
        <div className="top-container">
          <h1 className="comments-heading">Comments</h1>
          <div className="image-form-container">
            <div className="image-container">
              <img
                className="people-image"
                src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
                alt="comments"
              />
            </div>
            <div className="form-container">
              <p className="side-heading">
                Say something about 4.0 Technologies
              </p>
              <form onSubmit={this.getNameComment}>
                <input
                  value={name}
                  onChange={this.getName}
                  className="input-text"
                  type="text"
                  placeholder="Your Name"
                />
                <textarea
                  value={comment}
                  onChange={this.getComment}
                  className="text-area"
                  placeholder="Your Comment"
                  rows="8"
                >
                  {' '}
                </textarea>
                <button className="add-comment-btn" type="submit">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
          <hr />

          <div className="comments-count-container">
            <p className="comment-count">{commentsList.length}</p>
            <p className="comment-side-heading">Comments</p>
          </div>
          <ul className="list-container">{this.renderItem()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments

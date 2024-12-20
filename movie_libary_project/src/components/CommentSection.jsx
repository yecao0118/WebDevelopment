import { useState, useEffect } from 'react';
import './CommentSection.css';

function CommentSection({ 
  username, 
  comments, 
  loadComments, 
  addComment, 
  error, 
  onViewUserProfile 
}) {
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    loadComments();
    const intervalId = setInterval(loadComments, 5000);

    return () => clearInterval(intervalId);
  }, [loadComments]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!newComment.trim()) {
      return; 
    }

    const commentData = {
      username: username || 'Guest',
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
    };

    addComment(commentData);
    setNewComment(''); 
  }

  return (
    <div className="comment-section">
      {username ? (
        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p>
                  <strong
                    onClick={() => onViewUserProfile && onViewUserProfile(comment.username)}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {comment.username}
                  </strong>
                  : {comment.content}
                </p>
                <small>{new Date(comment.timestamp).toLocaleString()}</small>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      ) : (
        <p>Login to view and add comments.</p>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="comment-input">
        <form onSubmit={handleSubmit} className="comment__form" action="#/addcomment">
          <label>
            <input
              className="comment__input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={
                username ? "Write your comment here..." : "Login to add your comment..."
              }
              required
              disabled={!username}
            />
          </label>
          <button 
            className="comment__button" 
            type="submit" 
            disabled={!username}
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommentSection;
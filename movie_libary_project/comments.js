const comments = {};

function getComments(movieId) {
  if (!comments[movieId]) {
    comments[movieId] = [];
  }
  return comments[movieId];
}

function addComment(comment) {
  if (!comments[comment.movieId]) {
    comments[comment.movieId] = [];
  }
  comments[comment.movieId].push(comment);
  return comment;
}

export default {
  getComments,
  addComment,
};
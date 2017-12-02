const apiUrl = 'http://localhost:3001';
const token = 'abc123';
const headers = {'Authorization': token};


export const getAllCategories = () =>
  fetch(`${apiUrl}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${apiUrl}/posts`, {headers})
    .then(res => res.json())

export const getPost = postId =>
  fetch(`${apiUrl}/posts/${postId}`, {headers})
    .then(res => res.json())

export const addPost = post =>
  fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const deletePost = postId =>
  fetch(`${apiUrl}/posts/${postId}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json())

export const voteForPost = (postId, vote) =>
  fetch(`${apiUrl}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(res => res.json())
    .then(data => data)

export const voteForComment = (commentId, vote) =>
  fetch(`${apiUrl}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(res => res.json())
    .then(data => data)

export const editPost = post =>
  fetch(`${apiUrl}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const addComment = comment =>
  fetch(`${apiUrl}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const editComment = comment =>
  fetch(`${apiUrl}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const deleteComment = commentId =>
  fetch(`${apiUrl}/comments/${commentId}`, {
    method: 'DELETE',
    headers,
  }).then(res => res.json())

export const getComments = postId =>
  fetch(`${apiUrl}/posts/${postId}/comments`, {headers})
    .then(res => res.json())

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

export const updatePost = post =>
  fetch(`${apiUrl}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

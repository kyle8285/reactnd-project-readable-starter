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

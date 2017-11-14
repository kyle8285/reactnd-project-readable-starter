const apiUrl = 'http://localhost:3001';
const token = 'abc123';
const headers = {'Authorization': token};


export const getAllCategories = () =>
  fetch(`${apiUrl}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)

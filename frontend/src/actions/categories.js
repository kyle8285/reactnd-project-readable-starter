import * as Api from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const fetchCategories = () => dispatch => (
  Api.getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

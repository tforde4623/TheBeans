// get post Comments
const LOAD_CATEGORIES = 'categories/load'

const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
});

export const getCategories = () => async dispatch => {
  const res = await fetch(`/api/categories/`);

  const data = await res.json();
  if (res.ok) dispatch(loadCategories(data));
  return data;
};

const initialState = {};

const categoryReducer = (state = initialState, action) => {
  let newState = {};

  switch(action.type) {
    case LOAD_CATEGORIES:
      action.categories.forEach(c => {
        newState[c.id] = c;
      });

      return newState;

    default:
      return state;
  }
};

export default categoryReducer;

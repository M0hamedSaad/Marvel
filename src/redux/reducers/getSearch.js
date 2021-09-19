const INITIAL_STATE = { searchResult: null };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_SEARCH_DATA':
      return { ...INITIAL_STATE, searchResult: action.searchResult };

    default:
      return state;
  }
};
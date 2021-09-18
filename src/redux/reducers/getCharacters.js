const INITIAL_STATE = {  characters : null };
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CHARACTERS_DATA':
      return {...INITIAL_STATE, characters: action.characters};

    default:
      return state;
  }
};

export const getCharacters = (payload) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_CHARACTERS_DATA', characters: payload });
    }
}
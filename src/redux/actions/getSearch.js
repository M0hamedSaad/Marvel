
export const getSearch = (payload) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_SEARCH_DATA', searchResult: payload });
    }
}
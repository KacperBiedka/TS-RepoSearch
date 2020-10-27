import { searchErrorActionType } from './types';

export const actionTypes = {
    UPDATE_SEARCH_ERROR: "UPDATE_SEARCH_ERROR",
};
  
  export const updateSearchError = (error:string | null) => {
    return (dispatch: (args: searchErrorActionType) => searchErrorActionType) => {
      dispatch({
        type: actionTypes.UPDATE_SEARCH_ERROR,
        payload: error,
      });
    };
  };
  
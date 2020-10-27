import { actionTypes } from "../actions";
import { searchErrorActionType } from '../actions/types';

const searchReducer = (
  state = {
    searchError: null,
  },
  action: searchErrorActionType
) => {
  switch (action.type) {
    case actionTypes.UPDATE_SEARCH_ERROR:
      return {
        ...state,
        searchError: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
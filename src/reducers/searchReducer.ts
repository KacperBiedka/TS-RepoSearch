import { actionTypes } from "../actions";
import { searchErrorActionType } from '../actions/types';

export interface stateType {
    searchError: string | null
};

const searchReducer = (
  state: stateType = {
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
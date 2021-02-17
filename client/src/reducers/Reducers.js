import { SUBMITTED_FORM } from '../actions/Actions';

export default function reducers(state = [], action) {
  switch (action.type) {
    case SUBMITTED_FORM:
      return [...state, action.payload];

    default:
      return state;
  }
}

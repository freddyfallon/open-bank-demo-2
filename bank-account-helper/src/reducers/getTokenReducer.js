import actions from '../actions/actionTypes';

const defaultState = {
  token: false,
};

export default function getToken(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case actions.GET_TOKEN:
      return {
        ...state,
        token: action.value,
      };
    default:
      return { ...state };
  }
}

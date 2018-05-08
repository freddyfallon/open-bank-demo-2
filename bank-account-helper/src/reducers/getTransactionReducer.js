import actions from '../actions/actionTypes';

const defaultState = {
  transaction: {},
};

export default function getTransaction(state = defaultState, action) {
  switch (action.type) {
    case actions.GET_TRANSACTION:
      return {
        ...state,
        transaction: {
          description: action.value.description,
          amount: action.value.amount * -1,
        },
      };
    default:
      return { ...state };
  }
}

import request from 'request-promise-native';
import actions from './actionTypes';

export const getTransactrion = transaction => ({
  type: actions.GET_TRANSACTION,
  value: transaction,
});

export const requestTransaction = token => async (dispatch) => {
  const data = await request(`${process.env.REACT_APP_BANK_ROBBER_URL}/transactions`, {
    method: 'POST',
    body: {
      token,
    },
    uri: `${process.env.REACT_APP_BANK_ROBBER_URL}/transactions`,
    json: true,
  });
  dispatch(getTransactrion(data));
};

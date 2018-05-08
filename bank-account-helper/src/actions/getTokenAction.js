import request from 'request-promise-native';
import actions from './actionTypes';

export const getToken = token => ({
  type: actions.GET_TOKEN,
  value: token,
});

export const requestToken = code => async (dispatch) => {
  const token = await request(`${process.env.REACT_APP_BANK_ROBBER_URL}/token?code=${code}`);
  const tokenToJson = JSON.parse(token);
  dispatch(getToken(tokenToJson.access_token));
};

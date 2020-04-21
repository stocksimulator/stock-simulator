import types from '../action-types';

export const updateData = userData => {
  return {type: types.UPDATE_DATA, payload: userData}
}

export const setUserAuth = user => {
  return {type: types.SET_USER_AUTH, payload: user}
}
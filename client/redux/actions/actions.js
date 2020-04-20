import types from '../action-types';

export const updateData = userData => {
  return {type: types.UPDATE_DATA, payload: userData}
}
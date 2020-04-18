import types from '../action-types'

const initialState = {
  _id: null,
  username: null,
  cash: 100000,
  stocks: [{ stock: 'AACG', shares: 1, currentValue: 100 }],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER: {
      return 0; // placeholder
    }
    default: {
      return state;
    }
  }
};

export default userReducer;

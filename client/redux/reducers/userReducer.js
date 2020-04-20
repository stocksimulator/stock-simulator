import types from '../action-types'

const initialState = {
  _id: null,
  username: null,
  cash: 100000,
  stocks: [{ name: 'AACG', shares: 1, price: 100 }, { name: 'ACRX', shares: 4, price: 200 }],
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

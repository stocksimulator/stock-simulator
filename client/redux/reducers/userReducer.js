import types from '../action-types';

const initialState = {
  _id: null,
  username: null,
  cash: 100000,
  stocks: [
    { stock: 'AACG', shares: 1, currValue: 100 },
    { stock: 'ACRX', shares: 4, currValue: 200 },
  ],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_AUTH: {
      const _id = action.payload._id;
      const username = action.payload.username;
      return {
        ...state,
        _id,
        username,
      };
    }

    case types.UPDATE_DATA: {
      const cash = action.payload.cash;
      const stocks = action.payload.stocks;
      return {
        ...state,
        cash,
        stocks,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;

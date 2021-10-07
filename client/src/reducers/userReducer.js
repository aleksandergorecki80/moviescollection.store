const defaultState = '';
const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_USER_DATA':
      return action.user;
    case 'LOG_OUT_USER':
      return action.user;
    default:
      return state;
  }
};

export default userReducer;

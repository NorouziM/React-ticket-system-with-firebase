const INITIAL_STATE = {
  currentUser: {
    email: null,
    role: null,
  },
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: {
          email: action.payload.email,
          role: action.payload.role,
        },
      };
    default:
      return state;
  }
};
export default UserReducer;

const INITIAL_STATE = {
  currentUser: {
    email: null,
    role: null,
    uid: null,
    profileURL: null,
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
          uid: action.payload.uid,
          profileURL: action.payload.profileURL,
        },
      };

    default:
      return state;
  }
};
export default UserReducer;

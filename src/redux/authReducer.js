import { Authentification} from "../utils/Authentification";

const getAuth = "LOGIN";
const logout = "LOGOUT";

const initialState = {
  users: [
    { id: 1, name: "Alexandr", login: "1", password: "1" },
    { id: 2, name: "User 2", login: "2", password: "2" },
  ],
  errorLogin: {},
  userId: null,
  login: null,
  isAuth: false,
};

/* Reducer */

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case getAuth:

      return {
        ...state,
        ...state.erorLogin,
        isAuth: Authentification(action.login, action.password, state.users, state.errorLogin).isAuth,
        userId: Authentification(action.login, action.password, state.users, state.errorLogin).userId,
        login: Authentification(action.login, action.password, state.users, state.errorLogin).userLogin,
      };

    case logout:
      return {
        ...state,
        ...state.errorLogin,
        isAuth: false,
        errorLogin: {},
      };

    default:
      return state;
  }
};

/* Actions */

export const setlogin = (login, password) => {
  return {
    type: getAuth,
    login,
    password,
  };
};

export const setLogout = () => {
  return {
    type: logout,
  };
};

export default authReducer;

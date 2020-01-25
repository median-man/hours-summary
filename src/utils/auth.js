import React, { useReducer, useContext } from "react";

export const ERROR = "ERROR";
export const LOGOUT = "LOGOUT";
export const PENDING = "PENDING";
export const SUCCESS = "SUCCESS";

const initialState = {
  error: null,
  isLoggedIn: false,
  isPending: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.error,
        isPending: false
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isPending: false,
        user: null
      };
    case PENDING:
      return {
        ...state,
        isPending: true
      };
    case SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isPending: false,
        user: action.user
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const AuthContext = React.createContext([]);

export const AuthProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AuthContext.Provider
      value={[state, dispatch]}
      {...props}
    />
  );
};

export const useAuthContext = () => useContext(AuthContext);

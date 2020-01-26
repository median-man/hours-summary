import React, { useEffect } from "react";
import {
  useAuthContext,
  ERROR,
  PENDING,
  SUCCESS,
  LOGOUT
} from "../../utils/auth";
import { getAuth as gapiAuth } from "../../utils/google-api";

const GoogleAuth = ({ isGapiClientLoaded }) => {
  const [state, dispatch] = useAuthContext();

  useEffect(() => {
    dispatch({ type: PENDING });
    if (!isGapiClientLoaded) {
      // remain in pending state until google api client has loaded in
      return;
    }
    const onAuthChange = isSignedIn => {
      if (isSignedIn) {
        dispatch({
          type: SUCCESS,
          user: gapiAuth().currentUser.get()
        });
      } else {
        dispatch({ type: LOGOUT });
      }
    };
    try {
      const auth = gapiAuth();
      auth.isSignedIn.listen(onAuthChange);
      onAuthChange(auth.isSignedIn.get());
    } catch (error) {
      dispatch({ type: ERROR, error: error.message });
    }
  }, [dispatch, isGapiClientLoaded]);

  if (state.isPending) {
    return (
      <button
        onClick={() => gapiAuth().signIn()}
        className="btn btn-outline-primary ml-auto my-2 my-sm-0"
        disabled
      >
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />{" "}
        Loading...
      </button>
    );
  }
  if (state.isLoggedIn) {
    return (
      <button
        onClick={() => gapiAuth().signOut()}
        className="btn btn-outline-danger ml-auto my-2 my-sm-0"
      >
        Sign Out
      </button>
    );
  }
  return (
    <button
      onClick={() => gapiAuth().signIn()}
      className="btn btn-outline-primary ml-auto my-2 my-sm-0"
    >
      Sign In with Google
    </button>
  );
};

export default GoogleAuth;

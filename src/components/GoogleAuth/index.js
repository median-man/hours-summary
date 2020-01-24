import React, { useReducer, useEffect } from "react";
import config from "../../config.json";

const { GOOGLE_API_KEY, GOOGLE_CLIENT_ID } = config;

const GOOGLE_SHEETS_READY_ONLY_SCOPE =
  "https://www.googleapis.com/auth/spreadsheets.readonly";
const GOOGLE_DRIVE_METADATA_READ_ONLY_SCOPE =
  "https://www.googleapis.com/auth/drive.metadata.readonly";
const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];

const ERROR = "ERROR";
const LOGOUT = "LOGOUT";
const PENDING = "PENDING";
const SUCCESS = "SUCCESS";

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

const GoogleAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const onAuthChange = isSignedIn => {
      console.log("auth changed", { isSignedIn });
      if (isSignedIn) {
        return dispatch({
          type: SUCCESS,
          user: window.gapi.auth2.getAuthInstance().currentUser.get()
        });
      }
      return dispatch({ type: LOGOUT });
    };

    const initGapiClient = () => {
      dispatch({ type: PENDING });
      window.gapi.client
        .init({
          clientId: GOOGLE_CLIENT_ID,
          GOOGLE_API_KEY: GOOGLE_API_KEY,
          scope: [
            GOOGLE_SHEETS_READY_ONLY_SCOPE,
            GOOGLE_DRIVE_METADATA_READ_ONLY_SCOPE
          ].join(" "),
          discoveryDocs: DISCOVERY_DOCS
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          auth.isSignedIn.listen(onAuthChange);
          onAuthChange(auth.isSignedIn.get());
        })
        .catch(error => {
          dispatch({ type: ERROR, error: error.message });
        });
    };
    window.gapi.load("client:auth2", initGapiClient);
    return () => {
      window.gapi.auth2.getAuthInstance()
    }
  }, []);

  if (state.isPending) {
    return null;
  }
  if (state.isLoggedIn) {
    return (
      <button
        onClick={() => window.gapi.auth2.getAuthInstance().signOut()}
        className="btn btn-outline-danger ml-auto my-2 my-sm-0"
      >
        Sign Out
      </button>
    );
  }
  return (
    <button
      onClick={() => window.gapi.auth2.getAuthInstance().signIn()}
      className="btn btn-outline-primary ml-auto my-2 my-sm-0"
    >
      Sign In with Google
    </button>
  );
};

export default GoogleAuth;

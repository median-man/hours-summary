import React, { useEffect } from "react";
import config from "../../config.json";
import { useAuthContext, ERROR, PENDING, SUCCESS, LOGOUT } from "../../utils/auth";

const { GOOGLE_API_KEY, GOOGLE_CLIENT_ID } = config;

const GOOGLE_SHEETS_READY_ONLY_SCOPE =
  "https://www.googleapis.com/auth/spreadsheets.readonly";
const GOOGLE_DRIVE_METADATA_READ_ONLY_SCOPE =
  "https://www.googleapis.com/auth/drive.metadata.readonly";
const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];

const GoogleAuth = () => {
  const [state, dispatch] = useAuthContext();

  useEffect(() => {
    const onAuthChange = isSignedIn => {
      if (isSignedIn) {
        dispatch({
          type: SUCCESS,
          user: window.gapi.auth2.getAuthInstance().currentUser.get()
        });
      } else {
        dispatch({ type: LOGOUT });
      }
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
      window.gapi.auth2.getAuthInstance();
    };
  }, [dispatch]);

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

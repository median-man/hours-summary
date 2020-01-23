import React from "react";
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

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: false
  };
  auth = null;

  async componentDidMount() {
    window.gapi.load("client:auth2", this.initGapiClient);
  }

  initGapiClient = () => {
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
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
  };

  onAuthChange = isSignedIn => {
    console.log({ isSignedIn });
    console.log(this.auth.currentUser.get().getId());
    this.setState({ isSignedIn });
  };

  onSignInClick = () => this.auth.signIn();

  onSignOutClick = () => this.auth.signOut();

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    }
    if (this.state.isSignedIn) {
      return (
        <button
          onClick={this.onSignOutClick}
          className="btn btn-outline-danger ml-auto my-2 my-sm-0"
        >
          Sign Out
        </button>
      );
    }
    return (
      <button
        onClick={this.onSignInClick}
        className="btn btn-outline-primary ml-auto my-2 my-sm-0"
      >
        Sign In with Google
      </button>
    );
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;

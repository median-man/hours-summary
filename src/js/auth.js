const { gapi } = window;

const getAuthClient = () => {
  if (!gapi.auth2) {
    throw new Error('Google API Auth2 must be initialized.');
  }
  return gapi.auth2;
};

const initGapiClient = ({ handleSignInStatusChange }) => () => {
  const GOOGLE_API_KEY = 'AIzaSyDrOHTyZdBhmFNWdY_TX6Q5iADN0aKn1cw';
  const GOOGLE_CLIENT_ID =
    '661549194387-755tit59r7uggmsctfsjkt25vhl2j1ua.apps.googleusercontent.com';
  const GOOGLE_SHEETS_READY_ONLY_SCOPE =
    'https://www.googleapis.com/auth/spreadsheets.readonly';
  const GOOGLE_DRIVE_METADATA_READ_ONLY_SCOPE =
    'https://www.googleapis.com/auth/drive.metadata.readonly';
  const DISCOVERY_DOCS = [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
    'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  ];

  const onInitSuccess = () => {
    getAuthClient()
      .getAuthInstance()
      .isSignedIn.listen(handleSignInStatusChange);

    handleSignInStatusChange(
      getAuthClient()
        .getAuthInstance()
        .isSignedIn.get()
    );
  };

  const onInitError = console.error;

  gapi.client
    .init({
      clientId: GOOGLE_CLIENT_ID,
      GOOGLE_API_KEY: GOOGLE_API_KEY,
      scope: [
        GOOGLE_SHEETS_READY_ONLY_SCOPE,
        GOOGLE_DRIVE_METADATA_READ_ONLY_SCOPE,
      ].join(' '),
      discoveryDocs: DISCOVERY_DOCS,
    })
    .then(onInitSuccess, onInitError);
};

export const init = ({ onChange }) => {
  gapi.load(
    'client:auth2',
    initGapiClient({ handleSignInStatusChange: onChange })
  );
};

export const isSignedIn = () => {
  return getAuthClient()
    .getAuthInstance()
    .isSignedIn.get();
};

export const signOut = () => {
  getAuthClient()
    .getAuthInstance()
    .signOut();
};

export const signIn = () => {
  getAuthClient()
    .getAuthInstance()
    .signIn();
};

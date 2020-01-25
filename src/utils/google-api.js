import config from "../config.json";

const { GOOGLE_API_KEY, GOOGLE_CLIENT_ID } = config;

const GOOGLE_SHEETS_READY_ONLY_SCOPE =
  "https://www.googleapis.com/auth/spreadsheets.readonly";
const GOOGLE_DRIVE_METADATA_READ_ONLY_SCOPE =
  "https://www.googleapis.com/auth/drive.metadata.readonly";
const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
];

// Returns a promise which resolves after google client lib is loaded with the specified scopes
// Rejects if client fails to initialize with error from google api
export const loadClientWithAuth = async () => {
  return new Promise((resolve, reject) => {
    const initGapiClient = async () => {
      try {
        await window.gapi.client.init({
          clientId: GOOGLE_CLIENT_ID,
          GOOGLE_API_KEY: GOOGLE_API_KEY,
          scope: [
            GOOGLE_SHEETS_READY_ONLY_SCOPE,
            GOOGLE_DRIVE_METADATA_READ_ONLY_SCOPE
          ].join(" "),
          discoveryDocs: DISCOVERY_DOCS
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    window.gapi.load("client:auth2", initGapiClient);
  });
};

export const getAuth = () => window.gapi.auth2.getAuthInstance();

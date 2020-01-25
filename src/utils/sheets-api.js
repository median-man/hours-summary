const { gapi } = window;

let sheets = [];

const hoursLoadedAt = {
  get: () => new Date(parseInt(localStorage.getItem("hours-data-loaded-at"))),
  set: date => localStorage.setItem("hours-data-loaded-at", date.getTime())
};

export const fetchAllSheets = () => {
  return new Promise((resolve, reject) => {
    const handleListFilesResponse = response => {
      const { files } = response.result;
      if (!files || files.length < 1) {
        return reject(new Error("No Google Sheets!"));
      }
      sheets = files;
      resolve(files);
    };

    gapi.client.drive.files
      .list({
        fields: "nextPageToken, files(id, name, webViewLink, iconLink)",
        q: 'mimeType="application/vnd.google-apps.spreadsheet"'
      })
      .then(handleListFilesResponse, reject);
  });
};

export const setHoursSheet = sheetId =>
  localStorage.setItem(
    "hours-sheet",
    JSON.stringify(sheets.find(sheet => sheet.id === sheetId))
  );

export const setHoursSheetId = sheetId =>
  localStorage.setItem(
    "hours-sheet",
    JSON.stringify(sheets.find(sheet => sheet.id === sheetId))
  );

export const getHoursSheet = () =>
  JSON.parse(localStorage.getItem("hours-sheet"));

export const getHoursSheetId = () => {
  const hoursSheetData = getHoursSheet();
  return hoursSheetData && hoursSheetData.id;
};

export const isHoursSheetSet = () => !!getHoursSheet();

const convertDateSerialNumberToDate = serialNumber => {
  const SECONDS_PER_DAY = 86400;
  // Conversion: Jan 1, 1970 - Dec 30, 1899
  const CONVERSION_SECONDS = -2209161600;
  const epochSeconds = serialNumber * SECONDS_PER_DAY + CONVERSION_SECONDS;
  const result = new Date();
  result.setTime(epochSeconds * 1000);

  // make time zone correction (serial numbers are stored in local time without
  // the time zone)
  result.setMinutes(result.getTimezoneOffset() + result.getMinutes());

  return result;
};

const buildHoursItemFromRow = row => {
  const hoursItem = {};

  hoursItem.timestamp = convertDateSerialNumberToDate(parseFloat(row[0]));
  hoursItem.startDateTime = convertDateSerialNumberToDate(
    parseFloat(row[1]) + parseFloat(row[2])
  );
  hoursItem.endDateTime = convertDateSerialNumberToDate(
    parseFloat(row[1]) + parseFloat(row[3])
  );
  hoursItem.notes = row[4].trim();
  return hoursItem;
};

const useCachedHours = () => {
  const CACHE_SECONDS = 60;
  const timeSinceHoursLoaded =
    new Date().getTime() - hoursLoadedAt.get().getTime();
  return timeSinceHoursLoaded < CACHE_SECONDS * 1000;
};

export const fetchHours = () => {
  // google uses non-standard promises
  return new Promise((resolve, reject) => {
    if (useCachedHours()) {
      resolve(
        JSON.parse(localStorage.getItem("hours-data")).map(item => ({
          ...item,
          timestamp: new Date(item.timestamp),
          startDateTime: new Date(item.startDateTime),
          endDateTime: new Date(item.endDateTime)
        }))
      );
      return;
    }
    const params = {
      spreadsheetId: getHoursSheetId(),
      range: "A:E",
      valueRenderOption: "UNFORMATTED_VALUE",
      dateTimeRenderOption: "SERIAL_NUMBER"
    };
    gapi.client.sheets.spreadsheets.values.get(params).then(response => {
      // skip header row
      const hours = response.result.values.slice(1).map(buildHoursItemFromRow);
      hoursLoadedAt.set(new Date());
      localStorage.setItem("hours-data", JSON.stringify(hours));
      resolve(hours);
    }, reject);
  });
};

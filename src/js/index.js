import 'bootstrap';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';

import '../scss/index.scss';
import * as auth from './auth';
import * as sheetsApi from './sheets-api';
import { SheetListGroup } from './sheet-list-group';
import { Hours } from './hours';

library.add(faExternalLinkAlt);
dom.watch();

let $loginButton;
let sheetListGroup;
const hours = new Hours({ sheetsApi });

function updateSignInStatus(isSignedIn) {
  render();
  if (isSignedIn && sheetsApi.isHoursSheetSet() && !hours.isLoaded()) {
    hours.load().then(render);
  } else if (isSignedIn) {
    sheetsApi
      .fetchAllSheets()
      .then(sheets => render({ sheets }))
      .catch(console.error);
  }
}

function handleLoginClick() {
  try {
    if (auth.isSignedIn()) {
      auth.signOut();
      return;
    }
    $loginButton.text('Loading...');
    auth.signIn();
  } catch (error) {
    console.log(error);
  }
}

const handleHoursSheetSelected = sheetId => {
  sheetsApi.setHoursSheetId(sheetId);
  hours.load().then(render);
};

const render = ({ sheets } = {}) => {
  const isSignedIn = auth.isSignedIn();
  const isHoursSheetSet = sheetsApi.isHoursSheetSet();
  const isHoursLoaded = hours.isLoaded();

  if (isSignedIn) {
    $loginButton.text('Log Out').toggleClass('');
  } else {
    $loginButton.text('Sign In with Google');
  }

  if (isSignedIn && isHoursSheetSet) {
    sheetListGroup.hide().then(() => {
      $('#external-link-hours-sheet')
        .attr({
          href: sheetsApi.getHoursSheet().webViewLink,
        })
        .fadeIn();
    });
  } else if (!isHoursSheetSet && sheets) {
    sheetListGroup.setSheets(sheets);
    sheetListGroup.show();
  } else if (isSignedIn) {
    $('#external-link-hours-sheet').fadeOut();
    sheetListGroup.show();
  } else {
    sheetListGroup.hide();
  }

  if (isHoursLoaded) {
    const { currentDay, currentWeek } = hours.totals();
    $('#totals')
      .html(
        `
      <p>Hours Today: ${currentDay.hours.toFixed(2)}</p>
      <p>Hours This Week: ${currentWeek.hours.toFixed(2)}</p>
    `
      )
      .fadeIn();
  }
};

$(() => {
  $loginButton = $('#button-login');
  $('#button-select-sheet').on('click', () => {});

  $loginButton.text('Loading...');
  $loginButton.on('click', handleLoginClick);

  auth.init({ onChange: updateSignInStatus });

  sheetListGroup = new SheetListGroup({
    onSheetSelected: handleHoursSheetSelected,
  });
});

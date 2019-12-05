import 'bootstrap';
import '../scss/index.scss';
import * as auth from './auth';

let $loginButton;

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    $loginButton.text('Log Out').toggleClass('');
  } else {
    $loginButton.text('Sign In with Google');
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

$(() => {
  $loginButton = $('#button-login');
  $loginButton.text('Loading...');
  $loginButton.on('click', handleLoginClick);
  auth.init({ onChange: updateSignInStatus });
});

let APIURL = '';

//console.log(window.location.hostname);
switch (window.location.hostname) {
  case 'localhost' || '127.0.0.1':
    APIURL = 'http://localhost:3000';
    break;
  case 'jac-my-diligenceclient.herokuapp.com':
    APIURL = 'https://jac-my-diligenceapp.herokuapp.com';
}
export default APIURL;

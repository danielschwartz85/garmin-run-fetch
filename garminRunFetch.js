require('dotenv').config();
const debug = require('debug')('garmin:main');
const config = require('./config');
const loginAndGetCookies = require('./loginAndGetCookies');
const writeJson = require('./writeJson');
const readJson = require('./readJson');
const fetchActivity = require('./fetchActivity');
const isInvalidCredentials = require('./isInvalidCredentials');
const presult = require('./presult');

async function getAndSaveCookies() {
  debug('getting cookies');
  const cookies = await loginAndGetCookies(config);
  debug('writing cookies');
  writeJson(config.credentialsPath, cookies);
  return cookies;
}

async function garminRunFetch() {
  let [cookies] = await presult(readJson(config.credentialsPath));
  if (!cookies) {
    cookies = await getAndSaveCookies();
  }

  debug('getting activities');

  let response = await fetchActivity(cookies);
  if (isInvalidCredentials(response)) {
    debug('invalid credentials, retrying login.');
    cookies = await getAndSaveCookies();
    response = await fetchActivity(cookies);
  }

  debug('got activities');
  return response;
}

module.exports = garminRunFetch;

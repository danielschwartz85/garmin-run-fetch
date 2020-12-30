require('dotenv').config();
const debug = require('debug')('garmin:main');
const config = require('../config');
const loginAndGetCookies = require('./loginAndGetCookies');
const writeJson = require('./writeJson');
const readJson = require('./readJson');
const fetchActivity = require('./fetchActivity');
const isInvalidCredentials = require('./isInvalidCredentials');
const presult = require('./presult');

async function getAndSaveCookies(opts) {
  debug('getting cookies');
  const cookies = await loginAndGetCookies(opts);
  debug('writing cookies');
  writeJson(config.credentialsPath, cookies);
  return cookies;
}

async function garminRunFetch(opts) {
  let [cookies] = await presult(readJson(config.credentialsPath));
  if (!cookies) {
    cookies = await getAndSaveCookies(opts);
  }

  debug('getting activities');

  let response = await fetchActivity(cookies, opts);
  if (isInvalidCredentials(response)) {
    debug('invalid credentials, retrying login.');
    cookies = await getAndSaveCookies(opts);
    response = await fetchActivity(cookies, opts);
  }

  if (response.error) {
    throw new Error(`Failed to get activities ${response.error} ${response.message}`);
  }
  debug('got activities');
  return response;
}

module.exports = garminRunFetch;

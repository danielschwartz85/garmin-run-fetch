require('dotenv').config();
const debug = require('debug')('garmin:main');
const config = require('../config');
const loginAndGetCookies = require('./loginAndGetCookies');
const writeCredentials = require('./writeCredentials');
const readCredentials = require('./readCredentials');
const fetchActivity = require('./fetchActivity');
const isInvalidCredentials = require('./isInvalidCredentials');
const presult = require('./presult');

async function getAndSaveCookies(opts) {
  debug('getting cookies');
  const cookies = await loginAndGetCookies(opts);
  debug('writing cookies');
  writeCredentials({
    path: config.credentialsPath,
    credentials: cookies,
    key: opts.password,
  });
  return cookies;
}

async function garminRunFetch(opts) {
  debug('looking for credentials file');
  // eslint-disable-next-line prefer-const
  let [cookies, err] = await presult(readCredentials({
    path: config.credentialsPath,
    key: opts.password,
  }));
  if (!cookies) {
    debug('credentials file not found:', err && err.message);
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

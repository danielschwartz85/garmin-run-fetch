#!/usr/bin/env node
const writeJson = require('./writeJson');
const garminRunFetch = require('./garminRunFetch');

(async function run() {
  const opts = {
    userName: process.env.GARMIN_USER_NAME,
    password: process.env.GARMIN_PASSWORD,
    limit: process.env.GARMIN_LIMIT,
    startDate: process.env.GARMIN_START_DATE,
    endDate: process.env.GARMIN_END_DATE,
  };
  const response = await garminRunFetch(opts);
  if (process.env.GARMIN_RESULT_PATH) {
    await writeJson(process.env.GARMIN_RESULT_PATH, response);
  } else {
    // eslint-disable-next-line no-console
    console.log(response);
  }
}());

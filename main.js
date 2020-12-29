#!/usr/bin/env node
const writeJson = require('./writeJson');
const garminRunFetch = require('./garminRunFetch');

(async function run() {
  const response = await garminRunFetch();
  if (process.env.ACTIVITY_FILE_PATH) {
    await writeJson(process.env.ACTIVITY_FILE_PATH, response);
  } else {
    // eslint-disable-next-line no-console
    console.log(response);
  }
}());

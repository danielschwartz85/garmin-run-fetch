// const debug = require('debug')('garmin:activity');
const fetch = require('node-fetch');
const config = require('../config');

async function fetchActivity(cookies) {
  const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join('; ');
  const opts = {
    headers: {
      cookie: cookieString,
    },
  };
  const response = await fetch(config.activityUrl, opts);
  const json = await response.json();
  return json;
}

module.exports = fetchActivity;

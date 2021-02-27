const debug = require('debug')('garmin:fetch');
const fetch = require('node-fetch');
const config = require('../config');

async function fetchActivity(cookies, {
  limit = 20,
  startDate = 0,
  endDate = Date.now(),
}) {
  const cookieString = cookies.map((c) => `${c.name}=${c.value}`).join('; ');
  const opts = {
    headers: {
      cookie: cookieString,
      nk: 'NT',
    },
  };
  const url = config.activityUrl
    .replace('<limit>', limit)
    .replace('<startDate>', startDate)
    .replace('<endDate>', endDate);

  debug(`fetching activities, limit ${limit} startDate ${startDate} endDate ${endDate}.`);
  const response = await fetch(url, opts);
  const json = await response.json();
  return json;
}

module.exports = fetchActivity;

const fs = require('fs');
const util = require('util');
// const debug = require('debug')('garmin:fs')
const pReadFile = util.promisify(fs.readFile);

async function readJson(path) {
  const credentials = await pReadFile(path);
  return credentials && JSON.parse(credentials);
}

module.exports = readJson;

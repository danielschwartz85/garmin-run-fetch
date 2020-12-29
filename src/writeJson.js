const fs = require('fs');
const util = require('util');
// const debug = require('debug')('garmin:fs')
const pWriteFile = util.promisify(fs.writeFile);

async function writeJson(path, credentials) {
  return pWriteFile(path, JSON.stringify(credentials));
}

module.exports = writeJson;

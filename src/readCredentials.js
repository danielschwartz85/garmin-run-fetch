const fs = require('fs');
const util = require('util');
const { decrypt } = require('./credentialEncryption');
// const debug = require('debug')('garmin:credentials')
const pReadFile = util.promisify(fs.readFile);

async function readCredentials({ path, key }) {
  const encData = await pReadFile(path);
  if (!encData) { return null; }
  const credentials = decrypt(encData.toString(), key);
  return JSON.parse(credentials);
}

module.exports = readCredentials;

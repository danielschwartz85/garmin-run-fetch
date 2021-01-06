const fs = require('fs');
const util = require('util');
const { encrypt } = require('./credentialEncryption');
// const debug = require('debug')('garmin:credentials')
const pWriteFile = util.promisify(fs.writeFile);

async function writeCredentials({ path, credentials, key }) {
  const encData = encrypt(JSON.stringify(credentials), key);
  return pWriteFile(path, encData);
}

module.exports = writeCredentials;

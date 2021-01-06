const crypto = require('crypto');

const IV = Buffer.from('f5f9935a9bc19fe278130f9802dd7e28', 'hex');
const ENC_ALG = 'aes-256-ctr';
const filler = '86b6680a009da5c3d07d8e8c01ad7a84';

function normelizedKey(key) {
  if (key.length < filler.length) {
    return `${key}${filler.substring(key.length)}`;
  }
  return key.substing(0, filler.length);
}

function encrypt(str, key) {
  const nKey = normelizedKey(key);
  const password = Buffer.from(nKey);
  const cipher = crypto.createCipheriv(ENC_ALG, password, IV);
  let crypted = cipher.update(str, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}
function decrypt(str, key) {
  const nKey = normelizedKey(key);
  const password = Buffer.from(nKey);
  const decipher = crypto.createDecipheriv(ENC_ALG, password, IV);
  let dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

module.exports = { encrypt, decrypt };

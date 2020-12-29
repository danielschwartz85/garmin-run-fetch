function isInvalidCredentials(response) {
  return response.error && response.messsage === 'HTTP 403 Forbidden';
}

module.exports = isInvalidCredentials;

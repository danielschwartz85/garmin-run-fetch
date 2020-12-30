function isInvalidCredentials(response) {
  return response.error && response.message === 'HTTP 403 Forbidden';
}

module.exports = isInvalidCredentials;

/* eslint-disable no-sparse-arrays */
async function presult(promise) {
  return promise.then((r) => ([r])).catch((e) => ([, e]));
}

module.exports = presult;

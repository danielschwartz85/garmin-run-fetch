const puppeteer = require('puppeteer');
const debug = require('debug')('garmin:login');
const config = require('../config');

const {
  userNameSelector,
  passwordSelector,
  url,
  frameSelector,
  submitSelector,
  homeSelector,
} = config;

async function loginAndGetCookies({ userName, password }) {
  if (!userName || !password) {
    throw new Error("Missing 'userName' or 'password'!");
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // emulate non-headless
  // eslint-disable-next-line no-undef
  const headlessUserAgent = await page.evaluate(() => navigator.userAgent);
  const chromeUserAgent = headlessUserAgent.replace('HeadlessChrome', 'Chrome');
  await page.setUserAgent(chromeUserAgent);
  await page.setExtraHTTPHeaders({
    'accept-language': 'en-US,en;q=0.8',
  });

  await page.goto(url);

  // Wait for login frame :
  await page.waitForSelector(frameSelector);
  const elementHandle = await page.$(frameSelector);
  const frame = await elementHandle.contentFrame();

  // Wait for login inputs :
  const loginSelector = `${userNameSelector}, ${passwordSelector}`;
  // eslint-disable-next-line no-shadow
  await frame.waitForFunction((loginSelector) => {
    // eslint-disable-next-line no-undef
    const elems = document.querySelectorAll(loginSelector);
    return elems.length === 2;
  }, {}, loginSelector);

  debug('page login loaded');

  // Login :
  // eslint-disable-next-line no-shadow
  await frame.evaluate((userName, password, loginSelector, submitSelector) => {
    // eslint-disable-next-line no-undef
    const [userNameInput, passwordInput, button] = document.querySelectorAll(`${loginSelector}, ${submitSelector}`);
    userNameInput.value = userName;
    passwordInput.value = password;
    button.click();
  }, userName, password, loginSelector, submitSelector);

  debug('credentials are set');

  // Wait for login to complete :
  await page.waitForSelector(homeSelector);

  debug('got connect home page');

  const cookies = await page.cookies();

  debug('got cookies');

  await browser.close();
  return cookies;
}

module.exports = loginAndGetCookies;

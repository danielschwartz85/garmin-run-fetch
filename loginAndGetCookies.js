const puppeteer = require('puppeteer');
const debug = require('debug')('garmin:login');

async function loginAndGetCookies({
  userNameSelector,
  passwordSelector,
  url,
  frameSelector,
  submitSelector,
  homeSelector,
}) {
  if (!process.env.USER_NAME || !process.env.PASSWORD) {
    throw new Error("Missing env variables 'USER_NAME' or 'PASSWORD'!");
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
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
  }, process.env.USER_NAME, process.env.PASSWORD, loginSelector, submitSelector);

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
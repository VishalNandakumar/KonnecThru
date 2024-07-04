/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

let driver;

beforeAll(async () => {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options())
    .build();
});

afterAll(async () => {
  await driver.quit();
});

test("Testing for Title", async () => {
  await driver.get("http://localhost:5173");
  const title = await driver.getTitle();
  expect(title).toBe("KonnecThru");
});

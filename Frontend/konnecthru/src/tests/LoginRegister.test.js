/* eslint-disable no-undef */
// test/register.test.js

const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("@jest/globals");

jest.setTimeout(30000);

describe("Register Flow Test", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Register User", async () => {
    const registerUrl = "http://localhost:5173/register";

    // Go to the Register Page
    await driver.get(registerUrl);

    // Fill in the registration form
    await driver.findElement(By.id("name")).sendKeys("Test User");
    await driver.findElement(By.id("email")).sendKeys("testuser@example.com");
    await driver.findElement(By.id("dob")).sendKeys("1990-01-01");
    await driver.findElement(By.id("phoneNumber")).sendKeys("1234567890");
    await driver.findElement(By.id("password")).sendKeys("password123");

    // Submit the registration form
    await driver.findElement(By.id("register")).click();

    // Wait for alert and validate the message
    const alertText = await driver
      .wait(until.alertIsPresent())
      .then(async () => {
        const alert = await driver.switchTo().alert();
        const text = await alert.getText();
        await alert.accept();
        return text;
      });

    expect(alertText).toBe("Registration successful!");
  });
});

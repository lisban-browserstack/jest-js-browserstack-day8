const { Builder, By, Key, until, Capabilities } = require("selenium-webdriver");

describe("BStack demo test", () => {
  let driver;

  beforeAll(() => {
    driver = new Builder()
      .usingServer(`http://localhost:4444/wd/hub`)
      .withCapabilities(Capabilities.chrome())
      .build();
  });
  
  afterAll(async () => {
    await driver.quit();
  })
  
  test("login test", async () => {
    await driver.get("https://bstackdemo.com");
    await driver.wait(until.titleMatches(/StackDemo/i), 10000);

    await driver.wait(until.elementLocated(By.css("#signin")));
    await driver.findElement(By.css("#signin")).click();

    await driver.wait(until.elementLocated(By.css("#username input")));

    await driver
      .findElement(By.css("#username input"))
      .sendKeys("demouser", Key.ENTER);

    await driver
      .findElement(By.css("#password input"))
      .sendKeys("testingisfun99", Key.ENTER);

    await driver.findElement(By.css("#login-btn")).click();

    await driver.wait(until.titleMatches(/StackDemo/i), 10000);

        // locating product on webpage and getting name of the product
        await driver.wait(until.elementLocated(By.xpath('//*[@id="1"]/p')));
        let productText = await driver
          .findElement(By.xpath('//*[@id="1"]/p'))
          .getText();
        // clicking the 'Add to cart' button
        await driver.findElement(By.xpath('//*[@id="1"]/div[4]')).click();
        // waiting until the Cart pane has been displayed on the webpage
        await driver.wait(until.elementLocated(By.className("float-cart__content")));
        await driver.findElement(By.className("float-cart__content"));
        // locating product in cart and getting name of the product in cart
        let productCartText = await driver
          .findElement(
            By.xpath(
              '//*[@id="__next"]/div/div/div[2]/div[2]/div[2]/div/div[3]/p[1]'
            )
          )
          .getText();
        // checking whether product has been added to cart by comparing product name
        expect(productText).toBe(productCartText);

        await driver.findElement(By.className("buy-btn")).click();

  // Wait for shipping details form to load
  await driver.wait(until.elementLocated(By.id("firstNameInput")), 10000);

  // Fill in shipping details
  await driver.findElement(By.id("firstNameInput")).sendKeys("lisban");
  await driver.findElement(By.id("lastNameInput")).sendKeys("gonsalves");
  await driver.findElement(By.id("addressLine1Input")).sendKeys("gass, Vasai");
  await driver.findElement(By.id("provinceInput")).sendKeys("Maharashtra");
  await driver.findElement(By.id("postCodeInput")).sendKeys("401203");

  // Click on the submit button
  await driver.findElement(By.id("checkout-shipping-continue")).click();

  // Wait for the confirmation message
  await driver.wait(until.elementLocated(By.id("confirmation-message")), 10000);
  
  // Verify the success message
  let confirmationMessage = await driver.findElement(By.id("confirmation-message")).getText();
  expect(confirmationMessage).toBe("Your Order has been successfully placed.");


  }, 1000000);

  
});

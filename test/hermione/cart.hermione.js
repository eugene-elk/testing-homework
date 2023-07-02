const { assert } = require("chai");

describe("Оформление заказа:", async function () {

  // BUG_ID=10 npm start
  it("Валидация номера телефона в Checkout", async function ({ browser }) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await browser.url("http://localhost:3000/hw/store/");
    await page.goto("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".ProductItem-DetailsLink", { timeout: 1000 });
    await page.click(".ProductItem-DetailsLink");

    await page.waitForSelector(".ProductDetails-AddToCart", { timeout: 1000 });
    await page.click(".ProductDetails-AddToCart");

    await page.waitForSelector(".text-success", { timeout: 1000 });

    await page.goto(" http://localhost:3000/hw/store/cart");

    await page.waitForSelector(".Form-Field_type_phone", { timeout: 1000 });
    await page.click(".Form-Field_type_phone");
    await page.keyboard.type("89516470487");

    await page.waitForSelector(".Form-Submit", { timeout: 1000 });
    await page.click(".Form-Submit");

    await browser.assertView("Форма ", ".Form", {
      ignoreElements: [".Cart-MessageString"],
    });
  });

  // BUG_ID=8 npm start
  it("Сообщение об успешном заказе", async function ({ browser }) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await browser.url("http://localhost:3000/hw/store/");
    await page.goto("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".ProductItem-DetailsLink", { timeout: 1000 });
    await page.click(".ProductItem-DetailsLink");

    await page.waitForSelector(".ProductDetails-AddToCart", { timeout: 1000 });
    await page.click(".ProductDetails-AddToCart");

    await page.waitForSelector(".text-success", { timeout: 1000 });

    await page.goto(" http://localhost:3000/hw/store/cart");

    await page.waitForSelector(".Form-Field_type_name", { timeout: 1000 });

    await page.click(".Form-Field_type_name");
    await page.keyboard.type("Eugene");

    await page.waitForSelector(".Form-Field_type_phone", { timeout: 1000 });
    await page.click(".Form-Field_type_phone");
    await page.keyboard.type("89516470487");

    await page.waitForSelector(".Form-Field_type_address", { timeout: 1000 });
    await page.click(".Form-Field_type_address");
    await page.keyboard.type("Saint-Petersburg");

    await page.waitForSelector(".Form-Submit", { timeout: 1000 });
    await page.click(".Form-Submit");

    const successSelector = ".Cart-SuccessMessage";
    await page.waitForSelector(successSelector, { timeout: 1000 });

    await browser.assertView("Успешное создание заказа", ".Cart-SuccessMessage", {
      ignoreElements: [".Cart-MessageString"],
    });
  });
});
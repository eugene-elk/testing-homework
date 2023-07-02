describe("Страница продука:", async function () {

  // BUG_ID=9 npm start
  it("Просмотр информации о продукте", async function ({ browser }) {
    const puppeteer = await browser.getPuppeteer();
    const [page] = await puppeteer.pages();

    await browser.url("http://localhost:3000/hw/store/");
    await page.goto("http://localhost:3000/hw/store/catalog");

    await page.waitForSelector(".card-link", { timeout: 1000 });
    await page.click(".card-link");

    await page.waitForSelector(".ProductDetails-Description", { timeout: 1000 });
    await page.evaluate(() => {
      let element = document.querySelector(".ProductDetails-Description");
      if (element) {
        element.innerText = "New description";
      }
    });

    //await browser.pause(2000);

    await page.waitForSelector(".ProductDetailsCard", { timeout: 1000 });

    await browser.assertView("Карточка товара", ".ProductDetailsCard", {
      ignoreElements: [
        ".Cart-MessageString",
        ".ProductDetails-Name",
        ".ProductDetails-Description",
        ".ProductDetails-Price",
        ".ProductDetails-Color",
        ".ProductDetails-Material"
      ],
    });
  });


});
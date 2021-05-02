const puppeteer = require("puppeteer");

const sendMail = require("./sendmail");

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto("https://compragamer.com/");
    await page.setViewport({
        width: 1366,
        height: 768,
    });

    await page.waitForSelector("#aceptarNotificacion", { visible: true });

    await page.click("#aceptarNotificacion");

    await page.waitFor(1000);
    await page.waitForSelector("#listaProductos", { visible: true });
    await page.click("#listaProductos");

    await page.waitFor(1000);

    await page.waitForSelector("#mat-expansion-panel-header-2 > span", {
        visible: true,
    });
    await page.click("#mat-expansion-panel-header-2 > span");

    await page.waitForSelector(
        "#cdk-accordion-child-2 > div > p:nth-child(1)",
        {
            visible: true,
        }
    );
    await page.click("#cdk-accordion-child-2 > div > p:nth-child(1)");

    await page.waitForSelector(
        "cgw-product-alone:nth-child(17) > div > div.contenidoPrincipal > div.dotted > button",
        {
            visible: true,
        }
    );

    await page.hover(
        "cgw-product-alone:nth-child(17) > div > div.contenidoPrincipal > div.dotted > button"
    );

    const addToCartIsDisabled = await page.evaluate(
        'document.querySelector("cgw-product-alone:nth-child(17) > div > div.contenidoPrincipal > div.dotted > button").getAttribute("disabled")'
    );

    if (addToCartIsDisabled) {
        sendMail("El procesador no tiene stock, segui participando gilotario");
    } else {
        sendMail("Hay stock maquinola, comprar nomas!");
    }

    await browser.close();
})();

const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log("[BROWSER]", msg.text());
  });

  console.log("Navigating to http://localhost:5178");
  await page.goto("http://localhost:5178", { waitUntil: "load" });

  // Wait for loading
  await page.waitForFunction(
    () => !document.body.innerText.includes("Loading Game Assets..."),
    { timeout: 30000 },
  );
  console.log("Assets done.");

  for (let i = 0; i < 40; i++) {
    const txt = await page.evaluate(() => document.body.innerText);
    console.log(`[STATE ${i}] DOM TEXT: ${txt.replace(/\n/g, " | ")}`);

    // Find the React container and click it
    await page.evaluate(() => {
      const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      document.querySelector("div").dispatchEvent(evt);
      // Also just click absolutely everything
      document.body.click();
    });

    await page.waitForTimeout(1000);
  }

  await browser.close();
})();

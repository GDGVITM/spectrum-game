const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log("[BROWSER]", msg.text());
  });

  console.log("Navigating to http://localhost:5178");
  await page.goto("http://localhost:5178", { waitUntil: "load" });

  // wait for loading screen to leave
  await page.waitForFunction(
    () => !document.body.innerText.includes("Loading Game Assets..."),
    { timeout: 30000 },
  );
  console.log("Assets done.");

  let inCombat = false;
  // Poll text and click
  for (let i = 0; i < 40; i++) {
    const txt = await page.evaluate(() =>
      document.body.innerText.toLowerCase(),
    );

    // click if appropriate text
    if (
      txt.includes("attack") ||
      txt.includes("enter") ||
      txt.includes("spectrum")
    ) {
      await page.mouse.click(500, 300); // click main body
    }

    await page.waitForTimeout(500);
  }

  console.log("Wait for 20 seconds of logs...");
  for (let i = 0; i < 40; i++) {
    await page.mouse.click(500, 300);
    await page.waitForTimeout(500);
  }

  await browser.close();
})();

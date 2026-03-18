const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log("[PAGE LOG]", msg.text());
  });

  await page.goto("http://localhost:5178");

  await page.waitForFunction(() => {
    return !document.body.innerText.includes("Loading Game Assets...");
  }, { timeout: 30000 });
  console.log("Loading Game Assets... is gone.");

  // Let's see all text on page to find what to click
  let text = await page.evaluate(() => document.body.innerText);
  console.log("Current text:", text);

  // If there's "Click to enter" or similar, click it
  if (text.toLowerCase().includes("click to enter")) {
    await page.evaluate(() => {
      // Find the element with that text and click
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while(walker.nextNode()) {
        if(walker.currentNode.nodeValue.toLowerCase().includes("click to enter")) {
          walker.currentNode.parentElement.click();
        }
      }
    });
    console.log("Clicked 'Click to enter'");
  } else if (text.toLowerCase().includes("click to attack")) {
    await page.evaluate(() => {
      document.body.click();
    });
    console.log("Clicked body for 'Click to attack'");
  }

  // Poll for "combat" screen state or just click periodically
  const start = Date.now();
  console.log("Waiting 20 seconds to capture game state logs...");
  while (Date.now() - start < 20000) {
    await new Promise((r) => setTimeout(r, 1000));
    // If we're stuck, just click the screen to force audio/progress
    await page.mouse.click(100, 100);
  }

  console.log("Closing browser.");
  await browser.close();
})();
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2] || "http://localhost:3000/az";
const out = process.argv[3] || "shot.png";
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 900);

mkdirSync("shots", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(url, { waitUntil: "networkidle" });

// Scroll through so IntersectionObserver reveals every section
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.8);
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(700);

await page.screenshot({ path: `${out}` });
const fold = out.replace(/\.png$/, "-fold.png");
await page.screenshot({ path: fold });

const metrics = await page.evaluate(() => ({
  docH: document.body.scrollHeight,
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
  hiddenReveals: [...document.querySelectorAll(".reveal")].filter((e) => !e.classList.contains("is-visible")).length,
}));

console.log(JSON.stringify({ errors, metrics }));
await browser.close();

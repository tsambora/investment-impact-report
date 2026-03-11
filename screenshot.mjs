import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "impact-report.html");

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle0" });

// Wait for fonts to load
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 1000));

const body = await page.$("body");
const box = await body.boundingBox();

await page.screenshot({
  path: path.join(__dirname, "impact-report-screenshot.png"),
  fullPage: true,
});

console.log("Screenshot saved to impact-report-screenshot.png");
await browser.close();

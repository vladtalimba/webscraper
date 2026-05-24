import express from "express";
import cron from "node-cron";
import puppeteer from "puppeteer";
const app = express();
const PORT = 8080;
const browser = await puppeteer.launch();
async function getConsumables() {
    // Initialise puppeteer
    const page = await browser.newPage();
    // Navigate to web-scraping.dev
    await page.goto("https://www.web-scraping.dev/login");
    // Perform login action
    await page.type('[name=username]', 'user123');
    await page.type('[name=password]', 'password');
    await page.click('[type=submit]');
    // Making sure we are past the login page
    await page.screenshot({ path: "1.png" });
    // Wait for page to load, and go to the consumables category
    await page.goto("https://www.web-scraping.dev/products?category=consumables");
    await page.waitForSelector('img', {
        visible: true
    });
    // Making sure we have found the consumables.
    await page.screenshot({ path: '2.png' });
    const data = await page.evaluate(() => {
        // Get all images in the consumables category.
        const images = document.querySelectorAll('img');
        const urls = Array.from(images).map(v => v.src);
        // Get all titles.
        const titles = document.querySelectorAll(".mb-0");
        const titleTexts = Array.from(titles).map(v => v.textContent);
        // Get all product descriptions.
        const descriptions = document.querySelectorAll(".short-description");
        const descriptionTexts = Array.from(descriptions).map(v => v.textContent);
        // Get all prices.
        const prices = document.querySelectorAll(".price");
        const priceTexts = Array.from(prices).map(v => v.textContent);
        const data = [];
        const numOfProducts = urls.length;
        for (let i = 0; i < numOfProducts; i++) {
            data.push({
                productName: titleTexts[i],
                description: descriptionTexts[i],
                image: urls[i],
                price: priceTexts[i]
            });
        }
        return data;
    });
    console.log(data);
}
// Endpoints
app.get("/api/consumables", (req, res) => {
    res.send("Blablabla");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Cron job
cron.schedule('* * * * *', await getConsumables);

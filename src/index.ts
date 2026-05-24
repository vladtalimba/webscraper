import express from "express";
import { Request, Response } from "express";
import cron from "node-cron";
import puppeteer, { Browser, Page } from "puppeteer";
import { addConsumable, getConsumables } from "./db/queries/products.js";
import { NewProduct } from "./schemas/schema.js";

const app = express();
const PORT = 8080;

const browser: Browser = await puppeteer.launch();

async function scrapeConsumables(){

// Initialise puppeteer
const page: Page = await browser.newPage();

// Navigate to web-scraping.dev
await page.goto("https://www.web-scraping.dev/login");

// Perform login action

await page.type('[name=username]', 'user123');
await page.type('[name=password]', 'password');

await page.click('[type=submit]');

// Wait for page to load, and go to the consumables category
let pageNumber = 1;
await page.goto(`https://www.web-scraping.dev/products?category=consumables&page=${pageNumber}`);

await page.waitForSelector('img', {
    visible: true
});


const data: Object[] = await page.evaluate(() => {

    // Get all images in the consumables category.
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img'); 

    const urls: string[] = Array.from(images).map(v => v.src);

    // Get all titles.
    const titles: NodeListOf<Element> = document.querySelectorAll(".mb-0");

    const titleTexts = Array.from(titles).map(v => v.textContent);

   // Get all product descriptions.
    const descriptions: NodeListOf<Element> = document.querySelectorAll(".short-description");

    const descriptionTexts: string[] = Array.from(descriptions).map(v => v.textContent);

    // Get all prices.
    const prices: NodeListOf<Element> = document.querySelectorAll(".price");
    const priceTexts: string[] = Array.from(prices).map(v => v.textContent);

    const data: NewProduct[] = [];
    const numOfProducts = urls.length;

    for(let i = 0 ; i < numOfProducts; i++){
        data.push({
            productName: titleTexts[i],
            description: descriptionTexts[i],
            imageUrl: urls[i],
            price: priceTexts[i]
        } as NewProduct);
    }

    return data;
});

// Add found products to db.
await Promise.all(data.map(async product => {
   await addConsumable(product as NewProduct);
}));

console.log("Products successfully added!");
}

// Endpoints
app.get("/api/consumables", async (req: Request, res: Response) => {
    
    try {
        const consumables = await getConsumables();
        res.status(200).send(consumables);
    }catch(err){
        console.log(err);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// Cron job
cron.schedule('* * * * *', await scrapeConsumables);
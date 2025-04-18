// Import the Puppeteer library for browser automation
import puppeteer from "puppeteer";
const scrape = async () => {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();
    // Create a new page/tab in the browser
    const page = await browser.newPage();
    // Define the target URL to scrape
    const url = "https://books.toscrape.com/";
    // Navigate to the target URL
    await page.goto(url);
    const books = await page.evaluate(() => {
        // all the books have the class "product_pod"
        const books = document.querySelectorAll('.product_pod');
        return Array.from(books).map((book) => {
            const title = book.querySelector('h3')?.querySelector('a')?.getAttribute('title');
            const fullClassName = book.querySelector('.star-rating')?.className;
            const rating = fullClassName?.split(' ')[1];
            const price = book.querySelector('.price_color')?.textContent;
            const availability = book.querySelector('.instock.availability')?.textContent?.trim();
            return { title, rating, price, availability };
        });
    });
    console.log(books);
    // Close the browser to free up resources
    await browser.close();
};
// Execute the scraping function
scrape();

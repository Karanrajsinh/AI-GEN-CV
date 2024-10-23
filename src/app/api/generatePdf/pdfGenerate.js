
import puppeteer from "puppeteer"

export const generatePdf = async (htmlContent, width, height) => {
  const browser = await puppeteer.launch({
    // executablePath: "chrome@130.0.6723.58 /vercel/path1/.cache/puppeteer/chrome/linux-130.0.6723.58/chrome-linux64/chrome",
    args: ['--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process'], // Necessary for running Puppeteer on Vercel // Specify Chrome path for Vercel
    headless: true,  // Ensure it runs in headless mode
  });
  const page = await browser.newPage();
  const executablePath = puppeteer.executablePath();
  console.log('Puppeteer Executable Path:', executablePath);
  // console.log(htmlContent, 'pdfGenerate.js')
  // Set the content of the page to the passed HTML
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });



  // Add dynamic height and width by injecting CSS into the page
  await page.addStyleTag({
    content: `@page { size: ${width}px ${height}px; margin: 0; padding: 0; } body { margin: 0; padding: 0; }`,
  });

  // Generate PDF with dynamic sizing
  const pdfBuffer = await page.pdf({
    printBackground: true,
    margin: 0,
    width: `${width}px`,    // Use the dynamically calculated width
    height: `${height}px`,  // Use the dynamically calculated height
  });

  // Close browser
  await browser.close();

  return pdfBuffer;
};

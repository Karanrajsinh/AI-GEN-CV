
import puppeteer from "puppeteer"

export const generatePdf = async (htmlContent, width, height) => {
  const browser = await puppeteer.launch({
    headless: true,  // Ensure it runs in headless mode
  });
  const page = await browser.newPage();

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

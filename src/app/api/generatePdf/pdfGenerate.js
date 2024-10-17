// /* eslint-disable-next-line */
// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate to the page
//   await page.goto("http://localhost:3000", {
//     waitUntil: "networkidle2"
//   });

//   // Retrieve width and height of the content dynamically using evaluate
//   const { width, height } = await page.evaluate(() => {
//     const pdfElement = document.getElementById('pdf');
//     console.log(pdfElement) // Assuming 'pdf' is the ID of your container
//     return {
//       width: pdfElement.offsetWidth,
//       height: pdfElement.offsetHeight
//     };
//   });

//   console.log(width, height);

//   // Add dynamic height and width by injecting CSS into the page
//   await page.addStyleTag({
//     content: `@page { size: ${width}px ${height}px; margin: 0; padding : 0; } body { margin: 0; padding:0;}`
//   });

//   // Generate PDF with dynamic sizing
//   await page.pdf({
//     path: "output/resume.pdf",
//     printBackground: true,
//     margin: 0,
//     width: `${width}px`,    // Use the dynamically calculated width
//     height: `${height}px`, // Use the dynamically calculated height
//   });

//   // Close browser
//   await browser.close();
// })();

import puppeteer from 'puppeteer';

export const generatePdf = async (htmlContent) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content of the page to the passed HTML
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Retrieve width and height of the content dynamically using evaluate
  const { width, height } = await page.evaluate(() => {
    const pdfElement = document.getElementById('pdf'); // You can adjust this to target a specific element
    return {
      width: pdfElement.offsetWidth,
      height: pdfElement.offsetHeight,
    };
  });

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

const handleGeneratePdf = async (setPdfDownload) => {
    try {
        setPdfDownload(true)
        const pdfElement = document.getElementById('pdf');
        if (pdfElement) {
            const htmlContent = pdfElement.outerHTML; // Get the HTML content of the element

            // Optionally extract styles
            const styles = Array.from(document.styleSheets).map(styleSheet => {
                try {
                    return Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('\n');
                } catch (e) {
                    console.warn('Could not access stylesheet:', styleSheet.href);
                    return e;
                }
            }).join('\n');

            // Get the width and height of the pdfElement
            const width = pdfElement.offsetWidth;
            const height = pdfElement.offsetHeight;
            // Wrap the HTML content with the necessary <html> structure and styles
            const fullHtmlContent = `
                <!DOCTYPE html>
                <html>
                    <head>
                        <style>${styles}</style>
                    </head>
                    <body>${htmlContent}</body>
                </html>
            `;

            console.log(fullHtmlContent, width, height)

            // Send HTML content along with dimensions
            const response = await fetch('/api/generatePdf', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    htmlContent: fullHtmlContent,
                    width,
                    height
                }), // Include width and height
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const blob = await response.blob();
            const pdfUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.setAttribute('download', 'document.pdf');
            document.body.appendChild(link);
            setPdfDownload(false)
            link.click();
            link.remove();
        } else {
            console.error('Element with ID "pdf" not found');
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

export { handleGeneratePdf }
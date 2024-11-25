import { NextResponse } from 'next/server';
import { generatePdf } from './pdfGenerate';

export async function POST(request) {
    const { htmlContent, width, height } = await request.json(); // Expecting the HTML content to generate the PDF

    try {
        const pdfBuffer = await generatePdf(htmlContent, width, height);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=document.pdf',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse('Error generating PDF', { status: 500 });
    }
}

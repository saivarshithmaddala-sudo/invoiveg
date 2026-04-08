import html2pdf from 'html2pdf.js';

export const downloadInvoiceAsPDF = (elementId, invoiceNumber = 'invoice') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error("Element not found for PDF generation");
        return;
    }

    const options = {
        margin: 10,
        filename: `${invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().from(element).set(options).save();
};

export const printInvoice = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Invoice</title>');
    
    // Copy styles
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    styles.forEach(style => {
        printWindow.document.write(style.outerHTML);
    });

    // Custom styles for printing
    printWindow.document.write(`
        <style>
            body { padding: 20px; font-family: 'Inter', sans-serif; background: white !important; }
            .no-print { display: none !important; }
            .print-container { width: 100%; border: none; box-shadow: none; margin: 0; padding: 0; }
        </style>
    `);

    printWindow.document.write('</head><body>');
    printWindow.document.write(element.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
};

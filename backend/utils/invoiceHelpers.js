// Helper function to generate an invoice number
const generateInvoiceNumber = async (InvoiceModel) => {
    try {
        const lastInvoice = await InvoiceModel.findOne().sort({ createdAt: -1 });
        let nextNumber = 1001;
        
        if (lastInvoice && lastInvoice.invoiceNumber) {
            const lastNum = parseInt(lastInvoice.invoiceNumber.split('-')[1]);
            if (!isNaN(lastNum)) {
                nextNumber = lastNum + 1;
            }
        }
        
        return `INV-${nextNumber}`;
    } catch (error) {
        console.error("Error generating invoice number:", error);
        return `INV-${Math.floor(Math.random() * 1000) + 1000}`; // Fallback
    }
};

module.exports = { generateInvoiceNumber };

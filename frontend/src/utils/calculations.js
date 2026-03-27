/**
 * Invoice utility functions for real-time calculations.
 */

export const calculateLineTotal = (quantity, unitPrice) => {
    const qty = Number(quantity) || 0;
    const price = Number(unitPrice) || 0;
    const total = qty * price;

    return {
        lineTotal: parseFloat(total.toFixed(2)),
        taxAmount: 0,
        discountAmount: 0
    };
};

export const calculateSummary = (items) => {
    return items.reduce((acc, item) => {
        const { lineTotal, taxAmount, discountAmount } = calculateLineTotal(
            item.quantity, 
            item.unitPrice, 
            item.tax, 
            item.discount
        );
        
        const subtotalSnippet = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

        return {
            subtotal: parseFloat((acc.subtotal + subtotalSnippet).toFixed(2)),
            totalTax: parseFloat((acc.totalTax + taxAmount).toFixed(2)),
            totalDiscount: parseFloat((acc.totalDiscount + discountAmount).toFixed(2)),
            grandTotal: parseFloat((acc.grandTotal + lineTotal).toFixed(2))
        };
    }, { subtotal: 0, totalTax: 0, totalDiscount: 0, grandTotal: 0 });
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(amount);
};

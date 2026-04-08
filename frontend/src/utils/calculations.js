/**
 * Invoice utility functions for real-time calculations.
 */

export const calculateLineTotal = (quantity, unitPrice, taxPercentage = 0, discountPercentage = 0) => {
    const qty = Number(quantity) || 0;
    const price = Number(unitPrice) || 0;
    const taxRate = isNaN(Number(taxPercentage)) ? 0 : Number(taxPercentage);
    const discountRate = isNaN(Number(discountPercentage)) ? 0 : Number(discountPercentage);

    const baseTotal = qty * price;
    const discountAmount = Math.round(baseTotal * (discountRate / 100) * 100) / 100;
    const totalAfterDiscount = baseTotal - discountAmount;
    const taxAmount = Math.round(totalAfterDiscount * (taxRate / 100) * 100) / 100;
    const lineTotal = totalAfterDiscount + taxAmount;

    return {
        lineTotal: parseFloat(lineTotal.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        discountAmount: parseFloat(discountAmount.toFixed(2))
    };
};

export const calculateSummary = (items, taxPercentageOverride = null) => {
    return items.reduce((acc, item) => {
        const appliedTaxRate = taxPercentageOverride === null || taxPercentageOverride === undefined
            ? item.tax
            : taxPercentageOverride;
        const { lineTotal, taxAmount, discountAmount } = calculateLineTotal(
            item.quantity, 
            item.unitPrice, 
            appliedTaxRate, 
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

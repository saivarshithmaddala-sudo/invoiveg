/**
 * Validation utility functions for invoice forms.
 */

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
    // Basic phone validation (at least 10 digits)
    const re = /^\+?[0-9]{10,14}$/;
    return re.test(String(phone).replace(/\s/g, ''));
};

export const validateInvoice = (invoice) => {
    const errors = {};

    if (!invoice.customerName?.trim()) errors.customerName = "Customer name is required";
    if (!invoice.customerAddress?.trim()) errors.customerAddress = "Customer address is required";

    if (!invoice.items || invoice.items.length === 0) {
        errors.items = "At least one product is required";
    } else {
        invoice.items.forEach((item, index) => {
            if (!item.productName?.trim()) {
                if (!errors.items_detail) errors.items_detail = [];
                errors.items_detail[index] = { ...errors.items_detail[index], productName: "Required" };
            }
            if (Number(item.quantity) <= 0) {
                if (!errors.items_detail) errors.items_detail = [];
                errors.items_detail[index] = { ...errors.items_detail[index], quantity: "Must be > 0" };
            }
            if (Number(item.unitPrice) < 0) {
                if (!errors.items_detail) errors.items_detail = [];
                errors.items_detail[index] = { ...errors.items_detail[index], unitPrice: "Must be >= 0" };
            }
        });
    }

    if (!invoice.dueDate) errors.dueDate = "Due date is required";

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

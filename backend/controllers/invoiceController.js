const Invoice = require('../models/Invoice');
const { generateInvoiceNumber } = require('../utils/invoiceHelpers');

// Create a new invoice
const createInvoice = async (req, res) => {
    try {
        const { invoiceNumber } = req.body;
        
        // Auto-generate invoice number if not provided
        let finalInvoiceNumber = invoiceNumber;
        if (!finalInvoiceNumber) {
            finalInvoiceNumber = await generateInvoiceNumber(Invoice);
        }

        const newInvoice = new Invoice({ 
            ...req.body, 
            invoiceNumber: finalInvoiceNumber,
            user: req.user._id,
            userName: req.user.name
        });
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all invoices with search and filter
const getInvoices = async (req, res) => {
    try {
        const { invoiceNumber, customerName, status } = req.query;
        let query = {};

        // Role-based filtering: Admin sees all, User sees only their own
        if (req.user.role !== 'admin') {
            query.user = req.user._id;
        }

        if (invoiceNumber) {
            query.invoiceNumber = { $regex: invoiceNumber, $options: 'i' };
        }
        if (customerName) {
            query.customerName = { $regex: customerName, $options: 'i' };
        }
        if (status) {
            query.status = status;
        }

        const invoices = await Invoice.find(query).sort({ createdAt: -1 });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single invoice by ID
const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an invoice
const updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInvoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an invoice
const deleteInvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) return res.status(404).json({ message: 'Invoice not found' });
        res.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
};

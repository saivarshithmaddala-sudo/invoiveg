const express = require('express');
const router = express.Router();
const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} = require('../controllers/invoiceController');

const { protect, authorize } = require('../middleware/auth');

// All routes are prefixed with /api/invoices
router.post('/', protect, createInvoice);
router.get('/', protect, getInvoices);
router.get('/:id', protect, getInvoiceById);
router.put('/:id', protect, updateInvoice);
router.delete('/:id', protect, authorize('admin'), deleteInvoice);

module.exports = router;

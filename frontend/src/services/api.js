import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add interceptor to include token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Update standard instance usage
const axiosInstance = api;

export const productService = {
    getProducts: () => axiosInstance.get('/products'),
    createProduct: (data) => axiosInstance.post('/products', data),
    updateProduct: (id, data) => axiosInstance.put(`/products/${id}`, data),
    deleteProduct: (id) => axiosInstance.delete(`/products/${id}`),
};

export const invoiceService = {
    createInvoice: (data) => axiosInstance.post('/invoices', data),
    getInvoices: (params) => axiosInstance.get('/invoices', { params }),
    getInvoiceById: (id) => axiosInstance.get(`/invoices/${id}`),
    updateInvoice: (id, data) => axiosInstance.put(`/invoices/${id}`, data),
    deleteInvoice: (id) => axiosInstance.delete(`/invoices/${id}`),
};

export default axiosInstance;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import InvoiceGenerator from './pages/InvoiceGenerator';
import SavedInvoices from './pages/SavedInvoices';
import InvoiceDetails from './pages/InvoiceDetails';
import ProductManager from './pages/ProductManager';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="/products" element={<ProductManager />} />
          <Route path="/generator" element={<InvoiceGenerator />} />
          <Route path="/saved" element={<SavedInvoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

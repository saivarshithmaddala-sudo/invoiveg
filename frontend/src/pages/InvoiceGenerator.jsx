import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Pencil, FileCheck, CheckCircle, Info, Receipt, HelpCircle, LayoutDashboard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InvoiceForm from '../components/InvoiceForm';
import ProductTable from '../components/ProductTable';
import InvoicePreview from '../components/InvoicePreview';
import SummaryCard from '../components/SummaryCard';
import { calculateSummary, calculateLineTotal } from '../utils/calculations';
import { downloadInvoiceAsPDF, printInvoice } from '../utils/pdfGenerator';
import { validateInvoice } from '../utils/validators';
import { invoiceService, productService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const InvoiceGenerator = () => {
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    // Initial State
    const [masterProducts, setMasterProducts] = useState([]);
    const [invoice, setInvoice] = useState({
        businessName: 'Akshara Enterprises',
        businessAddress: '123 Enterprise Way, Industrial Park, Bangalore, KA, India',
        businessEmail: 'contact@akshara.in',
        businessPhone: '+91 80 4567 8901',
        customerName: '',
        customerAddress: '',
        customerEmail: '',
        customerPhone: '',
        invoiceNumber: 'AUTO-GENERATING...',
        invoiceDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'Pending',
        challanStatus: '',
        items: [],
        subtotal: 0,
        totalTax: 0,
        totalDiscount: 0,
        grandTotal: 0,
        notes: "Thank you for choosing Akshara Enterprises. We appreciate your business!"
    });

    // Load master products on mount
    useEffect(() => {
        const loadMaster = async () => {
             try {
                 const res = await productService.getProducts();
                 setMasterProducts(res.data);
             } catch (error) {
                 console.error("Master products failed to load");
             }
        };
        loadMaster();
    }, []);

    // Update summary when items or fields change
    useEffect(() => {
        const summary = calculateSummary(invoice.items);
        setInvoice(prev => ({ ...prev, ...summary }));
    }, [invoice.items]);

    const handleFieldChange = (field, value) => {
        setInvoice(prev => ({ ...prev, [field]: value }));
    };

    const handleAddItem = () => {
        const newItem = {
            productName: '',
            description: '',
            packetWeight: '',
            quantity: 1,
            unitPrice: 0,
            tax: 0, // No tax by default
            discount: 0,
            lineTotal: 0
        };
        setInvoice(prev => ({ ...prev, items: [...prev.items, newItem] }));
    };

    const handleUpdateItem = (index, field, value) => {
        const newItems = [...invoice.items];
        
        if (field === 'multi') {
            newItems[index] = { ...newItems[index], ...value };
        } else {
            newItems[index] = { ...newItems[index], [field]: value };
        }
        
        // Recalculate line total for this specific item
        const { lineTotal } = calculateLineTotal(
            newItems[index].quantity, 
            newItems[index].unitPrice, 
            newItems[index].tax || 5, 
            newItems[index].discount || 0
        );
        newItems[index].lineTotal = lineTotal;
        
        setInvoice(prev => ({ ...prev, items: newItems }));
    };

    const handleRemoveItem = (index) => {
        const newItems = invoice.items.filter((_, i) => i !== index);
        setInvoice(prev => ({ ...prev, items: newItems }));
    };

    const handlePlaceOrder = async () => {
        const { isValid, errors } = validateInvoice(invoice);
        
        if (!isValid) {
            const firstError = Object.values(errors)[0];
            toast.error(typeof firstError === 'string' ? firstError : "Please fix form errors", {
                icon: <Info className="text-rose-500" />,
                style: { borderRadius: '15px', padding: '16px', background: '#fff', color: '#0f172a' }
            });
            return;
        }

        setIsSaving(true);
        try {
            // Remove the temporary invoice number string so backend can generate it
            const payload = { ...invoice };
            if (payload.invoiceNumber === 'AUTO-GENERATING...') {
                delete payload.invoiceNumber;
            }

            const response = await invoiceService.createInvoice(payload);
            
            // Update local state with official invoice data (especially the real ID and number)
            setInvoice(prev => ({ 
                ...prev, 
                _id: response.data._id, 
                invoiceNumber: response.data.invoiceNumber 
            }));
            
            setOrderPlaced(true);
            
            toast.success(`Order Placed Successfully! (${response.data.invoiceNumber})`, {
                icon: <CheckCircle className="text-emerald-500" />,
                duration: 4000
            });
            
        } catch (error) {
            console.error("Place Order Error:", error);
            toast.error(error.response?.data?.message || "Failed to place order", {
                icon: <HelpCircle className="text-rose-500" />
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDownloadPDF = () => {
        downloadInvoiceAsPDF('invoice-preview', invoice.invoiceNumber);
    };

    const handlePrint = () => {
        printInvoice('invoice-preview');
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navbar />
            <Toaster position="top-right" />
            
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                <div className="flex flex-col md:row items-center justify-between mb-12 fade-in">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 leading-tight block flex items-center gap-4">
                            <Pencil className="text-blue-600" size={36} />
                            Generate New Invoice
                        </h1>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Single Column Workspace */}
                    <div className="lg:col-span-12 space-y-12 fade-in stagger-1 opacity-100">
                        <div className="flex items-center gap-4 mb-2">
                             <div className="h-0.5 flex-1 bg-slate-200" />
                             <span className="text-[10px] font-black font-outfit text-slate-400 uppercase tracking-[0.3em]">Customer Details</span>
                             <div className="h-0.5 flex-1 bg-slate-200" />
                        </div>

                        <div className="card p-8 rotate-0 hover:rotate-0 translate-y-0 shadow-sm border-slate-100 ring-0 space-y-4">
                            <input 
                                type="text"
                                placeholder="Enter customer name..."
                                className="input-field h-14 text-2xl font-black font-outfit bg-transparent border-none placeholder:text-slate-300 focus:ring-0"
                                value={invoice.customerName}
                                onChange={(e) => handleFieldChange('customerName', e.target.value)}
                            />
                            <textarea 
                                placeholder="Enter customer address..."
                                className="w-full text-slate-500 font-bold bg-transparent border-none focus:ring-0 placeholder:text-slate-300 resize-none h-20"
                                value={invoice.customerAddress}
                                onChange={(e) => handleFieldChange('customerAddress', e.target.value)}
                            />

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
                                <span className="text-xs font-black font-outfit text-slate-400 uppercase tracking-widest min-w-fit">Delivery Challan Status</span>
                                <input 
                                    type="text"
                                    className="flex-1 max-w-[300px] px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black font-outfit text-blue-600 focus:ring-1 focus:ring-blue-100 placeholder:text-slate-300"
                                    placeholder="Enter Challan Status..."
                                    value={invoice.challanStatus}
                                    onChange={(e) => handleFieldChange('challanStatus', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mb-2">
                             <div className="h-0.5 flex-1 bg-slate-200" />
                             <span className="text-[10px] font-black font-outfit text-slate-400 uppercase tracking-[0.3em]">Products Detail</span>
                             <div className="h-0.5 flex-1 bg-slate-200" />
                        </div>
                        
                        <ProductTable 
                            items={invoice.items} 
                            masterProducts={masterProducts}
                            onUpdate={handleUpdateItem} 
                            onAdd={handleAddItem} 
                            onRemove={handleRemoveItem} 
                        />

                        {/* Centered Actions */}
                        <div className="flex flex-col items-center gap-6 pt-8">
                             {!orderPlaced ? (
                                 <button 
                                     onClick={handlePlaceOrder}
                                     disabled={isSaving}
                                     className={`btn btn-primary px-20 py-5 rounded-2xl shadow-xl shadow-blue-100 hover:scale-105 transition-all text-lg flex items-center gap-3 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                                 >
                                     {isSaving ? (
                                         <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                     ) : (
                                         <CheckCircle size={24} />
                                     )}
                                     Place Order
                                 </button>
                             ) : (
                                 <div className="flex flex-col md:flex-row items-center gap-4">
                                     <button 
                                         onClick={handleDownloadPDF}
                                         className="btn btn-primary bg-emerald-600 hover:bg-emerald-700 border-emerald-600 px-12 py-5 rounded-2xl shadow-xl shadow-emerald-100 hover:scale-105 transition-all text-lg flex items-center gap-3"
                                     >
                                         <Receipt size={24} />
                                         Download Official Invoice
                                     </button>
                                     <button 
                                         onClick={() => window.location.reload()}
                                         className="btn bg-white border border-slate-200 text-slate-600 px-10 py-5 rounded-2xl hover:bg-slate-50 transition-all font-bold"
                                     >
                                         Create New Bill
                                     </button>
                                 </div>
                             )}
                        </div>

                        {/* Live Outlook Section for PDF Generation */}
                        <div className="pt-24 opacity-100">
                             <div className="flex items-center gap-4 mb-8">
                                  <div className="h-0.5 flex-1 bg-slate-200" />
                                  <span className="text-[10px] font-black font-outfit text-slate-400 uppercase tracking-[0.3em]">Live Invoice Outlook</span>
                                  <div className="h-0.5 flex-1 bg-slate-200" />
                             </div>
                             <div className="max-w-[1000px] mx-auto shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
                                 <InvoicePreview invoice={invoice} />
                             </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InvoiceGenerator;

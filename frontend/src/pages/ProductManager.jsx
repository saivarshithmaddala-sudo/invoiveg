import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/api';
import { toast, Toaster } from 'react-hot-toast';
import { ShoppingBag, Plus, Trash2, Edit2, Search, X, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductManager = () => {
    const { isAdmin } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', price: '', category: '', description: '' });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await productService.getProducts();
            setProducts(response.data);
        } catch (error) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ 
                name: product.name, 
                price: product.price, 
                category: product.category || '', 
                description: product.description || '' 
            });
        } else {
            setEditingProduct(null);
            setFormData({ name: '', price: '', category: '', description: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await productService.updateProduct(editingProduct._id, formData);
                toast.success("Product updated successfully");
            } else {
                await productService.createProduct(formData);
                toast.success("Product added to catalog");
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product from catalog?")) return;
        try {
            await productService.deleteProduct(id);
            toast.success("Product removed");
            fetchProducts();
        } catch (error) {
            toast.error("Error deleting product");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <Toaster position="top-right" />
            
            <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 fade-in">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 leading-tight block flex items-center gap-4">
                            <ShoppingBag className="text-emerald-500" size={36} />
                            Product Catalog
                        </h1>
                        <p className="text-lg text-slate-500 font-semibold mt-2 font-outfit uppercase tracking-widest block opacity-70">
                            Master Inventory for <span className="text-blue-600">Akshara Enterprises</span>
                        </p>
                    </div>

                    {isAdmin && (
                        <button 
                            onClick={() => handleOpenModal()}
                            className="btn btn-primary px-8 py-4 text-lg mt-8 md:mt-0"
                        >
                            <Plus className="mr-2" />
                            Add Master Product
                        </button>
                    )}
                </div>

                <div className="card overflow-hidden fade-in stagger-1 opacity-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.15em] font-black text-slate-500 font-outfit border-b border-slate-100">
                                    <th className="px-8 py-6">Product Item</th>
                                    <th className="px-6 py-6">Net Weight</th>
                                    <th className="px-6 py-6">Standard Price</th>
                                    <th className="px-8 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <div className="w-10 h-10 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin mx-auto" />
                                        </td>
                                    </tr>
                                ) : products.length > 0 ? (
                                    products.map((p) => (
                                        <tr key={p._id} className="group hover:bg-slate-50 transition-all duration-200">
                                            <td className="px-8 py-6 text-blue-600 font-black">
                                                 {p.name}
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                    {p.category || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 font-black text-emerald-600 text-xl font-outfit">
                                                ₹{p.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                {isAdmin ? (
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => handleOpenModal(p)}
                                                            className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
                                                        >
                                                            <Edit2 size={20} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(p._id)}
                                                            className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300"
                                                        >
                                                            <Trash2 size={20} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Read Only</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-32 text-center text-slate-300 font-outfit uppercase tracking-widest text-sm">
                                            The catalog is empty
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden fade-in">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-2xl font-black font-outfit text-slate-900">
                                {editingProduct ? 'Update Master Product' : 'Register New Product'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div>
                                <label className="label">Product Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="input-field h-12 text-blue-600 font-bold"
                                    placeholder="e.g. Premium Basmati Rice"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="label">Standard Price (₹)</label>
                                    <input 
                                        type="number" 
                                        required
                                        className="input-field h-12 font-black"
                                        placeholder="0.00"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="label">Net Weight (ml,kg,gm,L)</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="input-field h-12 font-black"
                                        placeholder="e.g. 500g, 1L"
                                        value={formData.category} 
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                            </div>
                            
                             <button type="submit" className="btn btn-primary w-full py-4 text-lg">
                                 <Check className="mr-2" />
                                 {editingProduct ? 'Save Master Changes' : 'Add to Catalog'}
                             </button>
                        </form>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
};

export default ProductManager;

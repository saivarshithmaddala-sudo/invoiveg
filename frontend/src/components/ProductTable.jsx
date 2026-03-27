import { useState, useRef, useEffect } from 'react';
import { Trash2, Plus, Info, ChevronDown, Package } from 'lucide-react';
import { calculateLineTotal } from '../utils/calculations';

const ProductTable = ({ items, masterProducts = [], onUpdate, onAdd, onRemove }) => {
    const [openPicker, setOpenPicker] = useState(null); // Track which row index has picker open
    const pickerRefs = useRef({});

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openPicker !== null && pickerRefs.current[openPicker] && !pickerRefs.current[openPicker].contains(event.target)) {
                setOpenPicker(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openPicker]);

    const handleSelectProduct = (index, product) => {
        // We use a dedicated batch update to prevent state race-conditions
        onUpdate(index, 'multi', {
            productName: product.name,
            unitPrice: product.price
        });
        setOpenPicker(null);
    };

    return (
        <div className="card overflow-hidden mt-10">
            <div className="bg-slate-50 border-b border-slate-200 px-8 py-4 flex justify-between items-center group">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <Plus size={20} />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 leading-tight block">Product Details</h3>
                </div>
                <button 
                  type="button"
                  onClick={onAdd}
                  className="btn btn-primary px-4 py-2 text-sm shadow-blue-100"
                >
                    <Plus size={16} className="mr-2" />
                    Add Item
                </button>
            </div>
            
            <div className="overflow-x-auto w-full min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.15em] font-black text-slate-500 font-outfit border-b border-slate-100">
                            <th className="px-8 py-5 w-[45%] text-left">Product Name</th>
                            <th className="px-4 py-5 w-[15%] text-center">Qty</th>
                            <th className="px-6 py-5 w-[15%] text-center">Rate</th>
                            <th className="px-8 py-5 w-[20%] text-right font-black">Total</th>
                            <th className="px-4 py-5 w-[60px]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {items.map((item, index) => {
                            const { lineTotal } = calculateLineTotal(item.quantity, item.unitPrice, 0, 0);
                            return (
                                <tr key={index} className="group hover:bg-slate-50 transition-all duration-200 min-h-[5rem]">
                                    <td className="px-8 py-5 relative" ref={el => pickerRefs.current[index] = el}>
                                        <div className="relative flex items-center">
                                            <input 
                                                type="text" 
                                                placeholder="Enter Product Name..."
                                                className="font-bold text-lg text-slate-900 bg-transparent border-none focus:ring-0 w-full placeholder:text-slate-300 pr-10"
                                                value={item.productName}
                                                onChange={(e) => onUpdate(index, 'productName', e.target.value)}
                                                onFocus={() => setOpenPicker(index)}
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setOpenPicker(openPicker === index ? null : index)}
                                                className={`p-2 rounded-lg transition-all ${openPicker === index ? 'bg-blue-50 text-blue-600' : 'text-slate-300 hover:text-blue-500'}`}
                                            >
                                                <ChevronDown size={20} className={`transform transition-transform ${openPicker === index ? 'rotate-180' : ''}`} />
                                            </button>
                                        </div>

                                        {/* Custom Product Picker Window */}
                                        {openPicker === index && (
                                            <div className="absolute top-full left-8 right-8 z-[200] mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden fade-in py-2 animate-in slide-in-from-top-2 duration-200">
                                                <div className="px-4 py-2 border-b border-slate-50 mb-2">
                                                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Master Catalog List</p>
                                                </div>
                                                <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                                                    {masterProducts.length > 0 ? (
                                                        masterProducts.map((p, i) => (
                                                            <button
                                                                key={i}
                                                                type="button"
                                                                onClick={() => handleSelectProduct(index, p)}
                                                                className="w-full text-left px-5 py-3 hover:bg-slate-50 flex items-center justify-between group/item"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover/item:bg-blue-50 group-hover/item:text-blue-600">
                                                                        <Package size={14} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                                                                        <p className="text-[10px] text-slate-400 font-medium">Standard Pricing</p>
                                                                    </div>
                                                                </div>
                                                                <span className="font-black text-emerald-600 text-sm font-outfit">
                                                                    ₹{p.price.toLocaleString()}
                                                                </span>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-5 py-8 text-center">
                                                            <p className="text-xs text-slate-400 italic">No master products found.</p>
                                                            <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold tracking-widest leading-relaxed">Add items in the PRODUCTS tab first</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-5 text-center">
                                        <input 
                                            type="number" 
                                            className="input-field border-transparent shadow-none bg-slate-100/30 h-10 w-full text-center font-bold"
                                            value={item.quantity}
                                            onChange={(e) => onUpdate(index, 'quantity', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <input 
                                            type="number" 
                                            className="input-field border-transparent shadow-none bg-slate-100/30 h-10 w-full text-center font-bold"
                                            value={item.unitPrice}
                                            onChange={(e) => onUpdate(index, 'unitPrice', e.target.value)}
                                        />
                                    </td>
                                    <td className="px-8 py-5 text-right font-black text-blue-600 text-xl font-outfit">
                                        {lineTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-5 text-right">
                                        <button 
                                            type="button"
                                            onClick={() => onRemove(index)}
                                            className="text-slate-300 hover:text-rose-500 transition-all duration-300 p-2"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {items.length === 0 && (
                <div className="py-20 text-center flex flex-col items-center gap-4 border-dashed border-2 border-slate-100 m-8 rounded-2xl">
                    <div className="bg-slate-50 p-6 rounded-full text-slate-300">
                        <Info size={48} />
                    </div>
                    <div>
                        <p className="text-slate-900 font-bold font-outfit text-lg leading-tight block">No Products Added Yet</p>
                        <p className="text-slate-500 text-sm">Add your first product to start calculating the total.</p>
                    </div>
                    <button 
                        type="button" 
                        onClick={onAdd}
                        className="btn btn-secondary mt-2 shadow-sm"
                    >
                        <Plus size={16} className="mr-2" />
                        Add First Product
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductTable;

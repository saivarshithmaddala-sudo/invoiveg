import { ShoppingBag, Percent, Receipt, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

const SummaryItem = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center justify-between group transition-all duration-300 transform hover:translate-x-1">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'} group-hover:scale-110`}>
                <Icon size={18} />
            </div>
            <span className="text-sm font-semibold text-slate-500 font-outfit uppercase tracking-wider">{label}</span>
        </div>
        <span className={`text-lg font-bold font-outfit ${color === 'emerald' ? 'text-emerald-600' : color === 'rose' ? 'text-rose-600' : 'text-slate-900'}`}>{formatCurrency(value)}</span>
    </div>
);

const SummaryCard = ({ summary, onSave, onDownload, onPrint, isSaving }) => {
    return (
        <div className="card p-8 sticky top-28 group relative overflow-hidden">
            <h3 className="text-xl font-bold font-outfit text-slate-900 leading-tight block mb-8 flex items-center gap-3">
                <Receipt className="text-blue-600" size={24} />
                Invoice Summary
            </h3>
            
            <div className="space-y-6 mb-10">
                <SummaryItem icon={ShoppingBag} label="Subtotal" value={summary.subtotal} />
                <SummaryItem icon={Percent} label="Total Tax" value={summary.totalTax} color="emerald" />
                <SummaryItem icon={Receipt} label="Discount" value={summary.totalDiscount} color="rose" />
            </div>
            
            <div className="pt-8 border-t-2 border-slate-100 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-slate-400 font-outfit uppercase tracking-[0.2em]">Grand Total</span>
                    <span className="text-4xl font-black text-blue-600 font-outfit leading-none">{formatCurrency(summary.grandTotal)}</span>
                </div>
                
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={onSave}
                        disabled={isSaving}
                        className="btn btn-primary w-full py-4 text-lg shadow-blue-200"
                    >
                        {isSaving ? "Saving..." : "Save Invoice"}
                    </button>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={onDownload}
                            className="btn btn-secondary py-3 text-sm"
                        >
                            Download PDF
                        </button>
                        <button 
                            onClick={onPrint}
                            className="btn btn-secondary py-3 text-sm"
                        >
                            Print Invoice
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:bg-blue-100/50 transition-colors" />
        </div>
    );
};

export default SummaryCard;

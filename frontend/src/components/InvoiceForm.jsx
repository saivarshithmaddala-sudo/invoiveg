import { User, Mail, Phone, MapPin, Calendar, FileText, Info } from 'lucide-react';

const FormField = ({ label, icon: Icon, children }) => (
    <div className="w-full">
        <label className="label">{label}</label>
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                <Icon size={18} />
            </div>
            {children}
        </div>
    </div>
);

const InvoiceForm = ({ invoice, onChange }) => {
    const handleInputChange = (field, value) => {
        onChange(field, value);
    };

    return (
        <div className="space-y-12">
            {/* Business Details */}
            <div className="card p-8 group relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <FileText size={20} />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 leading-tight block">Business Information</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Business Name" icon={FileText}>
                        <input 
                            type="text" 
                            className="input-field pl-12 h-12"
                            value={invoice.businessName}
                            disabled
                        />
                    </FormField>
                    <FormField label="Email Address" icon={Mail}>
                        <input 
                            type="email" 
                            className="input-field pl-12 h-12"
                            value={invoice.businessEmail}
                            onChange={(e) => handleInputChange('businessEmail', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Phone Number" icon={Phone}>
                        <input 
                            type="text" 
                            className="input-field pl-12 h-12"
                            value={invoice.businessPhone}
                            onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Address" icon={MapPin}>
                        <input 
                            type="text" 
                            className="input-field pl-12 h-12"
                            value={invoice.businessAddress}
                            onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                        />
                    </FormField>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:bg-blue-100/50 transition-colors" />
            </div>

            {/* Customer Details */}
            <div className="card p-8 group relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <User size={20} />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 leading-tight block">Customer Details</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Customer Name" icon={User}>
                        <input 
                            type="text" 
                            className="input-field pl-12 h-12"
                            placeholder="John Doe"
                            value={invoice.customerName}
                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Customer Email" icon={Mail}>
                        <input 
                            type="email" 
                            className="input-field pl-12 h-12"
                            placeholder="john@example.com"
                            value={invoice.customerEmail}
                            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Phone Number" icon={Phone}>
                        <input 
                            type="text" 
                            className="input-field pl-12 h-12"
                            placeholder="+91 1234567890"
                            value={invoice.customerPhone}
                            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Billing Address" icon={MapPin}>
                        <input 
                            type="text" 
                            className="input-field pl-12 h-12"
                            placeholder="Street, City, Country"
                            value={invoice.customerAddress}
                            onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                        />
                    </FormField>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:bg-indigo-100/50 transition-colors" />
            </div>

            {/* Invoice Metadata */}
            <div className="card p-8 group relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <Calendar size={20} />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 leading-tight block">Invoice Settings</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField label="Invoice Number" icon={FileText}>
                        <input 
                            type="text" 
                            className="input-field pl-12 h-12 font-bold text-blue-600"
                            value={invoice.invoiceNumber}
                            disabled
                        />
                    </FormField>
                    <FormField label="Invoice Date" icon={Calendar}>
                        <input 
                            type="date" 
                            className="input-field pl-12 h-12"
                            value={invoice.invoiceDate}
                            onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Due Date" icon={Calendar}>
                        <input 
                            type="date" 
                            className="input-field pl-12 h-12"
                            value={invoice.dueDate}
                            onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        />
                    </FormField>
                    <FormField label="Payment Status" icon={Info}>
                        <select 
                            className="input-field pl-12 h-12 appearance-none"
                            value={invoice.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                        >
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </FormField>
                </div>
            </div>

            {/* Notes */}
            <div className="card p-8 group relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <Info size={20} />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 leading-tight block">Additional Notes</h3>
                </div>
                <textarea 
                    className="input-field h-32 resize-none" 
                    placeholder="Enter payment terms, bank details, or a thank you message..."
                    value={invoice.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                />
            </div>
        </div>
    );
};

export default InvoiceForm;

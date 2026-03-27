import { formatCurrency } from '../utils/calculations';
import StatusBadge from './StatusBadge';

const InvoicePreview = ({ invoice }) => {
    // Fill up to 12 rows for that "Bill Book" feel
    const displayItems = [...(invoice.items || [])];
    while (displayItems.length < 12) {
        displayItems.push({ productName: '', packetWeight: '', quantity: '', unitPrice: '', lineTotal: '' });
    }

    return (
        <div id="invoice-preview" className="bg-white p-4 shadow-2xl min-h-[1100px] font-sans text-black relative">
            <div className="mb-0 text-gray-500 font-bold text-sm tracking-wider uppercase">INVOICE</div>
            
            {/* Header Boxed Section */}
            <div className="border-2 border-black flex flex-row">
                <div className="flex-1 bg-white p-8 flex items-center justify-center border-r-2 border-black">
                    <h1 className="text-4xl font-black font-outfit tracking-tight text-center">AKSHARA ENTERPRISES</h1>
                </div>
                <div className="w-[300px] bg-blue-50 p-4 text-[11px] font-bold leading-tight space-y-1">
                    <p>BHIVE Platinum</p>
                    <p>48, Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka - 560001</p>
                    <p>Contact: 9731105968</p>
                </div>
            </div>

            {/* Recipient Section */}
            <div className="border-2 border-black border-t-0 p-4 min-h-[100px]">
                <div className="text-[12px] font-bold mb-1">To:</div>
                <div className="pl-4">
                    <p className="text-xl font-black uppercase">{invoice.customerName || '_________________________'}</p>
                    <p className="text-sm font-bold text-slate-700 max-w-md mt-1 italic">{invoice.customerAddress || '____________________________________________________'}</p>
                </div>
            </div>

            {/* Product Table Grid */}
            <div className="border-2 border-black border-t-0">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b-2 border-black text-[12px] font-black uppercase tracking-wider text-center">
                            <th className="border-r-2 border-black py-3 w-[8%] italic">SL.No</th>
                            <th className="border-r-2 border-black py-3 w-[45%] text-left px-4">Product description</th>
                            <th className="border-r-2 border-black py-3 w-[15%]">Packet weight</th>
                            <th className="border-r-2 border-black py-3 w-[8%]">Qty</th>
                            <th className="border-r-2 border-black py-3 w-[12%]">Rate</th>
                            <th className="py-3 w-[12%]">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayItems.map((item, idx) => (
                            <tr key={idx} className="border-b border-black/10 h-10 text-[13px] font-bold">
                                <td className="border-r-2 border-black text-center text-slate-400">
                                    {item.productName ? idx + 1 : ''}
                                </td>
                                <td className="border-r-2 border-black px-4">{item.productName}</td>
                                <td className="border-r-2 border-black text-center">{item.packetWeight}</td>
                                <td className="border-r-2 border-black text-center">{item.quantity}</td>
                                <td className="border-r-2 border-black text-center">
                                    {item.unitPrice ? item.unitPrice.toLocaleString() : ''}
                                </td>
                                <td className="text-right px-4">
                                    {item.lineTotal ? item.lineTotal.toLocaleString() : ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="border-t-2 border-black font-black text-sm">
                            <td colSpan="5" className="border-r-2 border-black py-4 text-right px-6">TOTAL</td>
                            <td className="text-right px-4 py-4 text-lg">
                                {invoice.grandTotal ? invoice.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Signature Footer */}
            <div className="border-2 border-black border-t-0 flex justify-between p-4 h-24">
                <div className="flex flex-col justify-end">
                    <div className="w-40 border-t border-black text-[10px] text-center font-bold">Received By</div>
                </div>
                <div className="flex flex-col justify-end">
                    <div className="w-40 border-t border-black text-[10px] text-center font-bold">Signature</div>
                </div>
            </div>

            {/* Delivery Challan Status Section */}
            {invoice.challanStatus && (
                <div className="mt-6 border border-blue-100 bg-blue-50/50 p-4 rounded-xl">
                    <p className="text-[10px] font-black font-outfit text-blue-400 uppercase tracking-[0.2em] mb-1">Delivery Challan Status</p>
                    <p className="text-sm font-black text-blue-700 tracking-tight uppercase leading-tight">
                        {invoice.challanStatus}
                    </p>
                </div>
            )}

            {/* Watermark/Notice */}
            <div className="mt-8 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Digital Invoice generated by Akshara Enterprises ERP System</p>
            </div>
        </div>
    );
};

export default InvoicePreview;

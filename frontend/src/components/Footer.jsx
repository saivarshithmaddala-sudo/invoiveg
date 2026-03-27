import { Link } from 'react-router-dom';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200 py-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                        <div className="bg-blue-600 p-2 rounded-xl text-white">
                            <FileText size={20} />
                        </div>
                        <div>
                            <span className="text-xl font-bold font-outfit text-slate-900 leading-tight block">Akshara</span>
                            <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest block -mt-1">Enterprises</span>
                        </div>
                    </div>
                    <p className="text-slate-600 mb-8 max-w-sm">
                        Premier billing and enterprise solutions. Helping businesses grow with better invoicing.
                    </p>
                    <div className="flex gap-4 items-center justify-center md:justify-start">
                        {[Github, Linkedin, Mail].map((Icon, i) => (
                            <Link key={i} to="#" className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                <Icon size={20} />
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-outfit text-slate-900 leading-tight block">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</Link></li>
                        <li><Link to="/generator" className="text-slate-600 hover:text-blue-600 transition-colors">Create Invoice</Link></li>
                        <li><Link to="/saved" className="text-slate-600 hover:text-blue-600 transition-colors">History</Link></li>
                        <li><Link to="/generator" className="text-slate-600 hover:text-blue-600 transition-colors">New Invoice</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-outfit text-slate-900 leading-tight block">Support</h4>
                    <ul className="space-y-4">
                        <li><Link to="#" className="text-slate-600 hover:text-blue-600 transition-colors">Documentation</Link></li>
                        <li><Link to="#" className="text-slate-600 hover:text-blue-600 transition-colors">API Reference</Link></li>
                        <li><Link to="#" className="text-slate-600 hover:text-blue-600 transition-colors">Contact Support</Link></li>
                        <li><Link to="#" className="text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-8">
                <div className="text-center md:text-left">
                    <p>&copy; 2026 Akshara Enterprises. All rights reserved.</p>
                </div>
                <div className="text-center md:text-right max-w-sm">
                    <p className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-1 block">Head Office</p>
                    <p className="leading-relaxed opacity-70">
                        48, Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { Link } from 'react-router-dom';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass-footer relative overflow-hidden py-16">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/8 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white/5 to-transparent" />
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left relative">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                        <div className="bg-[#7E0E16] p-2 rounded-xl text-white">
                            <FileText size={20} />
                        </div>
                        <div>
                            <span className="text-xl font-bold font-outfit text-white leading-tight block">Akshara</span>
                            <span className="text-[10px] font-semibold text-white uppercase tracking-widest block -mt-1">Enterprises</span>
                        </div>
                    </div>
                    <p className="mb-8 max-w-sm text-white">
                        Premier billing and enterprise solutions. Helping businesses grow with better invoicing.
                    </p>
                    <div className="flex gap-4 items-center justify-center md:justify-start">
                        {[Github, Linkedin, Mail].map((Icon, i) => (
                            <Link key={i} to="#" className="p-3 rounded-full bg-white/12 border border-white/14 text-white hover:bg-white/18 hover:text-white transition-all duration-300 backdrop-blur-md">
                                <Icon size={20} />
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="mb-6 font-bold font-outfit leading-tight text-white block">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link to="/" className="text-white transition-colors hover:text-white">Home</Link></li>
                        <li><Link to="/generator" className="text-white transition-colors hover:text-white">Create Invoice</Link></li>
                        <li><Link to="/saved" className="text-white transition-colors hover:text-white">History</Link></li>
                        <li><Link to="/generator" className="text-white transition-colors hover:text-white">New Invoice</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-6 font-bold font-outfit leading-tight text-white block">Support</h4>
                    <ul className="space-y-4">
                        <li><Link to="#" className="text-white transition-colors hover:text-white">Documentation</Link></li>
                        <li><Link to="#" className="text-white transition-colors hover:text-white">API Reference</Link></li>
                        <li><Link to="#" className="text-white transition-colors hover:text-white">Contact Support</Link></li>
                        <li><Link to="#" className="text-white transition-colors hover:text-white">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/14 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-white relative">
                <div className="text-center md:text-left">
                    <p>&copy; 2026 Akshara Enterprises. All rights reserved.</p>
                </div>
                <div className="text-center md:text-right max-w-sm">
                    <p className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white">Head Office</p>
                    <p className="leading-relaxed text-white">
                        48, Church St, Haridevpur, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

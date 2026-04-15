import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, isAdmin } = useAuth();
    const [isAtTop, setIsAtTop] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY <= 24);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-[100] overflow-hidden border-b border-white/12 glass py-4 transition-all duration-300 ${
                isAtTop ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
            }`}
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/6" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-56 bg-gradient-to-r from-white/6 to-transparent" />
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-[#7E0E16] p-2 rounded-xl text-white">
                        <FileText size={24} />
                    </div>
                    <div>
                        <span className="text-xl font-bold font-outfit text-white leading-tight block">Akshara</span>
                        <span className="text-[10px] font-semibold text-white uppercase tracking-widest block -mt-1">Enterprises</span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-bold text-white hover:text-white transition-colors uppercase tracking-widest font-outfit">Home</Link>
                    <Link to="/saved" className="text-sm font-bold text-white hover:text-white transition-colors uppercase tracking-widest font-outfit">Orders</Link>
                    {isAdmin && (
                        <Link to="/products" className="text-sm font-bold text-white hover:text-white transition-colors uppercase tracking-widest font-outfit">Products</Link>
                    )}

                    <div className="h-6 w-px bg-white/18" />

                    <div className="flex items-center gap-3 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-md">
                        <ShieldCheck size={16} />
                        <div className="text-right">
                            <p className="text-xs font-black text-white font-outfit leading-none">{user.name}</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/88">
                                Direct Access Enabled
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import { Link } from 'react-router-dom';
import { FileText, PlusCircle, LayoutDashboard, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();

    return (
        <nav className="fixed top-0 w-full z-[100] border-b border-slate-200/60 glass py-4">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-xl text-white">
                        <FileText size={24} />
                    </div>
                    <div>
                        <span className="text-xl font-bold font-outfit text-slate-900 leading-tight block">Akshara</span>
                        <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest block -mt-1">Enterprises</span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest font-outfit">Home</Link>
                    <Link to="/saved" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest font-outfit">Orders</Link>
                    {isAdmin && (
                        <Link to="/products" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors uppercase tracking-widest font-outfit">Products</Link>
                    )}
                    
                    <div className="h-6 w-px bg-slate-200" />

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 pr-4 border-r border-slate-100">
                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                <User size={16} />
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-black text-slate-900 font-outfit leading-none">{user?.name}</p>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 opacity-70">
                                    {user?.role === 'admin' ? 'Administrator' : 'Billing Staff'}
                                </p>
                            </div>
                        </div>

                        <button 
                            onClick={logout}
                            className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300"
                            title="Sign Out"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

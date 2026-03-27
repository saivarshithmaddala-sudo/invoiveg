import { ShoppingBag, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ActionCard = ({ icon: Icon, title, description, to, color }) => (
    <Link to={to} className="group flex-1">
        <div className="card p-8 h-full relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-300 ${color === 'blue' ? 'bg-blue-50 border-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                <Icon size={32} />
            </div>
            
            <h3 className="text-2xl font-black font-outfit text-slate-900 leading-tight block mb-4 uppercase tracking-tight">
                {title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-[240px]">
                {description}
            </p>
            
            <div className="flex items-center gap-2 text-sm font-black font-outfit uppercase tracking-widest transition-all duration-300 group-hover:gap-4 group-hover:text-slate-900 text-slate-400">
                Get Started
                <ArrowRight size={18} />
            </div>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:bg-slate-100/80 transition-colors" />
        </div>
    </Link>
);

const QuickActions = () => {
    return (
        <section className="max-w-7xl mx-auto px-6 -mt-10 mb-24 relative z-20">
            <div className="grid md:grid-cols-2 gap-8">
                <ActionCard 
                    icon={ShoppingBag}
                    title="PRODUCTS"
                    description="Manage your product inventory, set prices, and organize your catalog."
                    to="/products"
                    color="emerald"
                />
                <ActionCard 
                    icon={FileText}
                    title="Bill & Invoice"
                    description="Generate professional invoices, tax reports, and client billing in seconds."
                    to="/generator"
                    color="blue"
                />
            </div>
        </section>
    );
};

export default QuickActions;

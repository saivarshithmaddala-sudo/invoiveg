import { Link } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle, Zap, PlusCircle, LayoutDashboard } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="fade-in">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
                        <Sparkles size={16} />
                        Trusted by Akshara Enterprises
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold font-outfit text-slate-900 leading-[1.1] mb-6">
                        Invoicing <span className="text-blue-600">Simplified</span> for your Business.
                    </h1>
                    
                    <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
                        Create, manage, and download professional invoices in seconds. Streamlined billing for modern enterprises.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/generator" className="btn btn-primary px-8 py-4 text-lg">
                            <PlusCircle className="mr-3" />
                            Start Invoicing
                        </Link>
                        <Link to="/saved" className="btn btn-secondary px-8 py-4 text-lg">
                            <LayoutDashboard className="mr-3" />
                            View History
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200" />
                            ))}
                        </div>
                        <div className="text-sm font-medium text-slate-500">
                            Trusted by <span className="text-slate-900 font-bold">500+</span> businesses nationwide.
                        </div>
                    </div>
                </div>

                <div className="relative fade-in stagger-2 opacity-100">
                    <div className="bg-white/40 border border-white/60 p-6 rounded-3xl shadow-2xl backdrop-blur-xl -rotate-2 relative z-10 transition-transform duration-500 hover:rotate-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[400px]">
                            <div className="flex justify-between mb-8 pb-4 border-b border-slate-50">
                                <div>
                                    <div className="w-12 h-4 bg-slate-100 rounded mb-2" />
                                    <div className="w-24 h-6 bg-blue-100 rounded" />
                                </div>
                                <div className="text-right">
                                    <div className="w-32 h-6 bg-slate-900 rounded mb-2" />
                                    <div className="w-20 h-4 bg-slate-200 rounded ml-auto" />
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="h-10 w-full bg-slate-50 rounded" />
                                <div className="h-10 w-full bg-slate-50 rounded" />
                                <div className="h-10 w-full bg-slate-50 rounded" />
                            </div>

                            <div className="flex justify-between pt-4 border-t border-slate-50">
                                <div className="w-24 h-8 bg-slate-100 rounded" />
                                <div className="w-32 h-10 bg-blue-600/10 rounded" />
                            </div>
                        </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute -top-6 -right-6 bg-green-500 text-white p-4 rounded-2xl rotate-12 shadow-xl animate-bounce duration-[3000ms]">
                        <CheckCircle size={24} />
                    </div>
                    <div className="absolute -bottom-10 -left-6 bg-blue-600 text-white p-4 px-6 rounded-2xl -rotate-6 shadow-xl">
                        <div className="flex items-center gap-3">
                            <Zap size={20} className="fill-blue-300 text-blue-300" />
                            <span className="font-bold">Total: ₹98,420.00</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

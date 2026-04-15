import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
    const { user } = useAuth();
    
    // If logged in, redirect to dashboard by default
    if (user) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="site-shell min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
                
                <div className="text-center fade-in w-full max-w-4xl mx-auto">
                    <div className="relative p-12 md:p-20 rounded-[3rem] border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))] shadow-[0_30px_80px_-20px_rgba(30,0,0,0.8)] backdrop-blur-3xl overflow-hidden group">
                        
                        {/* Decorative inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
                        <div className="absolute -top-24 -right-24 w-60 h-60 bg-white/20 rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-60 opacity-30" />
                        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-black/20 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <h1 className="text-5xl md:text-8xl font-black font-outfit text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)] tracking-tight mb-6 leading-tight">
                                Akshara<br />Enterprises
                            </h1>
                            <p className="text-lg md:text-xl text-white/90 font-bold tracking-[0.3em] uppercase mb-12 max-w-2xl mx-auto drop-shadow-md">
                                Official Operations Platform
                            </p>
                            
                            <Link to="/" className="inline-flex items-center gap-3 bg-white text-[#7E0E16] px-10 py-5 rounded-full text-lg font-black shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-slate-50 uppercase tracking-widest border-2 border-transparent hover:border-white/50">
                                <ArrowRight size={24} />
                                Open Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Landing;

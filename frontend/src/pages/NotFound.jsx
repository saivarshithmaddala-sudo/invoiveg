import { Link } from 'react-router-dom';
import { HelpCircle, ChevronLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
    return (
        <div className="site-shell">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 pt-52 pb-40 text-center flex flex-col items-center gap-8 fade-in">
                <div className="w-24 h-24 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 animate-bounce duration-[4000ms]">
                    <HelpCircle size={64} />
                </div>
                <div className="space-y-4">
                    <h1 className="text-6xl font-black font-outfit text-slate-900 leading-tight block uppercase tracking-tighter">404: Missing Page</h1>
                    <p className="text-xl text-slate-500 font-medium max-w-md mx-auto leading-relaxed">Oops! The invoice or page you're searching for has vanished into thin air. Let's get you back to safety.</p>
                </div>
                <Link to="/" className="btn btn-primary px-10 py-4 text-lg">
                    <ChevronLeft size={20} className="mr-3" />
                    Back to Homepage
                </Link>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;

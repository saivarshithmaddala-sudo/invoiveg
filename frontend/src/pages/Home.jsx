import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import QuickActions from '../components/QuickActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="pt-40">
                <QuickActions />
            </main>
            <Footer />
        </div>
    );
};

export default Home;

import QuickActions from '../components/QuickActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BannerCarousel from '../components/BannerCarousel';

const Home = () => {
    return (
        <div className="site-shell">
            <Navbar />
            <main className="space-y-12 pb-24 pt-32">
                <BannerCarousel />
                <QuickActions />
            </main>
            <Footer />
        </div>
    );
};

export default Home;

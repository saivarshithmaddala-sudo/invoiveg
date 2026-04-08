import { Zap, Clock, ShieldCheck, Download, Smartphone, LayoutDashboard } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="card p-8 group overflow-hidden relative">
        <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <Icon size={32} />
        </div>
        <h3 className="text-xl font-bold mb-4 font-outfit text-slate-900 leading-tight block">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:bg-blue-200/50 transition-colors" />
    </div>
);

const FeaturesSection = () => {
    const features = [
        {
            icon: Zap,
            title: "Instant Creation",
            description: "Generate professional invoices in under a minute with our streamlined interface and smart defaults."
        },
        {
            icon: Smartphone,
            title: "Mobile Ready",
            description: "Manage your business on the go. Our platform is fully responsive and optimized for every device."
        },
        {
            icon: Download,
            title: "Premium Exports",
            description: "Download crystal-clear, professional PDF invoices ready to be sent to your valuable clients."
        },
        {
            icon: LayoutDashboard,
            title: "History Storage",
            description: "Never lose an invoice. We securely store all your billing history for easy access and management."
        },
        {
            icon: ShieldCheck,
            title: "Dynamic Status",
            description: "Track payment status in real-time. Mark invoices as paid, unpaid, or pending with a single click."
        },
        {
            icon: Clock,
            title: "Auto-Calculations",
            description: "Spend more time on your business. Let us handle the tax, discount, and grand total math accurately."
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 mb-6 leading-tight">
                        Everything you need to <span className="text-blue-600">master</span> your billing.
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Say goodbye to manual errors and complicated spreadsheets. Akshara Enterprises gives you the power of enterprise-grade tools with simple, intuitive design.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in stagger-2 opacity-100">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;

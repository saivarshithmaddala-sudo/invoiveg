import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Mail, Lock, User, UserPlus, LogIn, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(name, email, password);
        if (result.success) {
            toast.success('Registration successful!');
            navigate('/');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <Toaster position="top-right" />
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl shadow-blue-100 -rotate-3">
                        AE
                    </div>
                    <h1 className="text-3xl font-black font-outfit text-slate-900 mb-2">Join Akshara</h1>
                    <p className="text-slate-500 font-medium font-outfit uppercase tracking-widest text-xs">Create New Billing Profile</p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="label">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    required
                                    className="input-field pl-12 h-12"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    className="input-field pl-12 h-12"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input 
                                    type="password" 
                                    required
                                    className="input-field pl-12 h-12"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full py-4 text-lg">
                            <UserPlus className="mr-3" size={20} />
                            Register Now
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm mb-4">Already have an account?</p>
                        <Link to="/login" className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2">
                            <LogIn size={18} />
                            Access Login Portal
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-emerald-500 font-bold font-outfit uppercase tracking-widest text-[10px]">
                    <ShieldCheck size={16} />
                    Secured by Akshara Cloud
                </div>
            </div>
        </div>
    );
};

export default Register;

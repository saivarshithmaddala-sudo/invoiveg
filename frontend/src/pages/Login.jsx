import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { Mail, Lock, LogIn, Sparkles, UserPlus } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            toast.success('Welcome Back!');
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
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 shadow-xl shadow-blue-100 rotate-3">
                        AE
                    </div>
                    <h1 className="text-3xl font-black font-outfit text-slate-900 mb-2">Akshara Invoicing</h1>
                    <p className="text-slate-500 font-medium">Enterprise Access Portal</p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <LogIn className="mr-3" size={20} />
                            Access Account
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm mb-4">Don't have an account yet?</p>
                        <Link to="/register" className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2">
                            <UserPlus size={18} />
                            Create New Access
                        </Link>
                    </div>
                </div>

                <div className="mt-12 text-center text-xs text-slate-400 uppercase tracking-widest font-bold">
                    © 2026 Akshara Enterprises Inc.
                </div>
            </div>
        </div>
    );
};

export default Login;

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

    const fieldClass =
        'h-12 w-full rounded-2xl border border-white/55 bg-white/82 pl-12 pr-4 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#8E1823] focus:ring-4 focus:ring-[#7E0E16]/12';
    const labelClass =
        'mb-2 ml-1 block text-xs font-bold uppercase tracking-[0.24em] text-slate-700';

    return (
        <div className="site-shell flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
            <Toaster position="top-right" />
            <div className="w-full max-w-md rounded-[36px] border border-white/15 bg-[linear-gradient(135deg,rgba(255,247,247,0.16),rgba(255,247,247,0.08))] p-4 shadow-[0_28px_90px_-42px_rgba(27,2,7,0.95)] backdrop-blur-2xl sm:p-5">
                <div className="relative mb-5 overflow-hidden rounded-[30px] border border-white/18 bg-[linear-gradient(135deg,rgba(126,14,22,0.88),rgba(91,8,15,0.64))] px-8 py-10 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                    <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-white/12 blur-2xl" />
                    <div className="absolute -right-8 bottom-0 h-24 w-24 rounded-full bg-black/10 blur-2xl" />
                    <div className="mx-auto mb-6 flex h-20 w-20 -rotate-3 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-3xl font-black text-white shadow-[0_22px_46px_-22px_rgba(28,2,6,0.95)] backdrop-blur-xl">
                        AE
                    </div>
                    <h1 className="mb-2 text-3xl font-black font-outfit text-white sm:text-[2.15rem]">
                        Join Akshara
                    </h1>
                    <p className="font-outfit text-sm font-semibold uppercase tracking-[0.28em] text-rose-50/80">
                        Create New Billing Profile
                    </p>
                </div>

                <div className="glass rounded-[30px] border border-white/30 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className={labelClass}>Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    required
                                    className={fieldClass}
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    className={fieldClass}
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    className={fieldClass}
                                    placeholder="Create a secure password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn w-full bg-[#7E0E16] py-4 text-lg text-white shadow-[0_22px_42px_-24px_rgba(63,4,11,0.9)] hover:bg-[#691018] hover:shadow-[0_26px_46px_-24px_rgba(63,4,11,0.95)]"
                        >
                            <UserPlus className="mr-3" size={20} />
                            Register Now
                        </button>
                    </form>

                    <div className="mt-8 border-t border-white/30 pt-8 text-center">
                        <p className="mb-4 text-sm font-medium text-slate-600">Already have an account?</p>
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 font-bold text-[#7E0E16] transition-colors duration-200 hover:text-[#5f0b12]"
                        >
                            <LogIn size={18} />
                            Access Login Portal
                        </Link>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold font-outfit uppercase tracking-[0.26em] text-rose-50/82">
                    <ShieldCheck size={16} />
                    Secured by Akshara Cloud
                </div>
            </div>
        </div>
    );
};

export default Register;

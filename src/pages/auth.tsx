import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeonLayout from '../components/layout/neon-layout';
import { Lock, Mail, Apple, Github, Sparkles } from 'lucide-react';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/upload');
    };

    return (
        <NeonLayout>
            <div className="sm:px-8 sm:py-5 bg-card/90 border-border border rounded-3xl mx-auto max-w-[400px] pt-5 px-6 pb-5 relative shadow-2xl backdrop-blur-xl transition-colors duration-300">
                {/* Top glow dots */}
                <div className="absolute left-10 top-5 hidden h-1.5 w-16 rounded-full bg-neutral-700/60 sm:block" />
                <div className="absolute right-10 top-5 hidden h-1.5 w-10 rounded-full bg-neutral-700/30 sm:block" />

                {/* Logo */}
                <div className="flex justify-center">
                    <div className="flex bg-neutral-900 w-14 h-14 rounded-2xl relative shadow-[0_0_0_1px_rgba(82,82,91,0.7)] items-center justify-center group overflow-hidden">
                        <div className="flex bg-neutral-950 w-10 h-10 rounded-2xl relative items-center justify-center transition-transform group-hover:scale-110">
                            <Sparkles className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div className="absolute inset-0 bg-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Heading */}
                <div className="mt-4 text-center">
                    <h1 className="text-[22px] leading-tight tracking-tight font-semibold text-foreground">
                        Sign in to NeonGrid
                    </h1>
                    <p className="mt-2 text-sm font-normal text-muted-foreground">
                        New to the workspace?{' '}
                        <a className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors" href="#">
                            Create an account
                        </a>
                    </p>
                </div>

                {/* Form */}
                <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground" htmlFor="email">
                            Work email
                        </label>
                        <div className="flex items-center rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground shadow-inner group focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                            <Mail className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-emerald-400" />
                            <input
                                className="ml-3 flex-1 bg-transparent text-sm font-normal text-neutral-100 placeholder:text-neutral-600 focus:outline-none"
                                id="email"
                                placeholder="you@studio.dev"
                                type="email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground" htmlFor="password">
                                Password
                            </label>
                            <a className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors" href="#">
                                Forgot?
                            </a>
                        </div>
                        <div className="flex items-center rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground shadow-inner group focus-within:border-emerald-500/50 focus-within:ring-1 focus-within:ring-emerald-500/20 transition-all">
                            <Lock className="w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-emerald-400" />
                            <input
                                className="ml-3 flex-1 bg-transparent text-sm font-normal text-neutral-100 placeholder:text-neutral-600 focus:outline-none"
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                required
                            />
                            <button
                                className="ml-2 rounded-full px-2 py-1 text-[11px] font-medium text-neutral-400 hover:bg-neutral-800/80 hover:text-neutral-100 transition"
                                type="button"
                            >
                                Show
                            </button>
                        </div>
                    </div>

                    <button
                        className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_14px_35px_rgba(16,185,129,0.35)] hover:bg-emerald-400 active:scale-[0.98] transition-all"
                        type="submit"
                    >
                        Continue to dashboard
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground my-3">
                        <div className="h-px flex-1 bg-border/50" />
                        <span className="font-semibold uppercase tracking-wider">OR</span>
                        <div className="h-px flex-1 bg-border/50" />
                    </div>

                    {/* Social buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <button className="flex items-center justify-center rounded-xl border border-border bg-card px-2 py-2.5 hover:border-neutral-700 hover:bg-accent transition-all" type="button">
                            <Sparkles className="w-5 h-5 text-emerald-400" />
                        </button>
                        <button className="flex items-center justify-center rounded-xl border border-border bg-card px-2 py-2.5 hover:border-neutral-700 hover:bg-accent transition-all" type="button">
                            <Apple className="w-5 h-5 text-emerald-400" />
                        </button>
                        <button className="flex items-center justify-center rounded-xl border border-border bg-card px-2 py-2.5 hover:border-neutral-700 hover:bg-accent transition-all" type="button">
                            <Github className="w-5 h-5 text-emerald-400" />
                        </button>
                    </div>

                    {/* Subtext */}
                    <p className="pt-2 text-[11px] leading-relaxed text-neutral-500 text-center">
                        By continuing, you agree to the NeonGrid{' '}
                        <a className="font-medium text-neutral-200 hover:text-emerald-400" href="#">Terms</a>{' '}
                        and{' '}
                        <a className="font-medium text-neutral-200 hover:text-emerald-400" href="#">Privacy Policy</a>.
                    </p>
                </form>
            </div>
        </NeonLayout>
    );
};

export default AuthPage;

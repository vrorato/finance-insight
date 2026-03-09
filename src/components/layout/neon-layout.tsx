import React from 'react';
import { ThemeToggle } from '../theme-toggle';

interface NeonLayoutProps {
    children: React.ReactNode;
}

const NeonLayout: React.FC<NeonLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen antialiased flex items-center justify-center text-foreground bg-background px-4 py-8 relative overflow-hidden transition-colors duration-300">
            {/* Theme Toggle Positioned Top-Right */}
            <div className="fixed top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            {/* Background with Gradient Mask */}
            <div
                className="fixed inset-0 -z-10 saturate-0 brightness-50 dark:brightness-50 light:brightness-100"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
                }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.05),transparent)] dark:bg-[rgba(16,185,129,0.05)] light:bg-[rgba(16,185,129,0.02)]" />
                <div className="absolute inset-0 bg-[grid-white/[0.02]] dark:bg-[grid-white/[0.02]] light:bg-[grid-black/[0.02]] bg-[size:50px_50px]" />
            </div>

            {/* Circuit Nodes Decoration */}
            <div className="pointer-events-none hidden md:block absolute inset-0 opacity-40 dark:opacity-40 light:opacity-10">
                {/* Left upper node */}
                <div className="absolute left-10 top-1/4 flex items-center gap-2 text-neutral-700">
                    <div className="h-px w-24 bg-neutral-800" />
                    <div className="relative h-9 w-16 rounded-xl bg-neutral-900/80 shadow-[0_0_0_1px_rgba(82,82,91,0.4)] flex items-center justify-center border border-neutral-800/50">
                        <div className="h-1 w-10 rounded-full bg-neutral-700" />
                        <span className="absolute -left-1 h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.65)] animate-pulse" />
                    </div>
                </div>

                {/* Right upper node */}
                <div className="absolute right-10 top-1/5 flex items-center gap-2 text-neutral-700">
                    <div className="relative h-9 w-20 rounded-xl bg-neutral-900/80 shadow-[0_0_0_1px_rgba(82,82,91,0.4)] flex items-center justify-center border border-neutral-800/50">
                        <div className="h-1 w-12 rounded-full bg-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.65)]" />
                        <span className="absolute -right-1 h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.65)] animate-pulse" />
                    </div>
                    <div className="h-px w-24 bg-neutral-800" />
                </div>

                {/* Left bottom node */}
                <div className="absolute left-20 bottom-20 flex items-center gap-2 text-neutral-700">
                    <div className="h-px w-32 bg-neutral-800" />
                    <div className="relative h-9 w-20 rounded-xl bg-neutral-900/80 shadow-[0_0_0_1px_rgba(82,82,91,0.4)] flex items-center justify-center border border-neutral-800/50">
                        <div className="flex gap-1">
                            <span className="h-1 w-2 rounded bg-neutral-700" />
                            <span className="h-1 w-2 rounded bg-neutral-700/60" />
                            <span className="h-1 w-2 rounded bg-neutral-700/40" />
                        </div>
                        <span className="absolute -left-1 h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.65)] animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="w-full max-w-5xl mx-auto relative z-10">
                {children}
            </main>
        </div>
    );
};

export default NeonLayout;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonLayout from '../components/layout/neon-layout';
import { cn, formatCurrency } from '@/lib/utils';
import {
    TrendingDown,
    TrendingUp,
    Wallet,
    ArrowLeft,
    Plus,
    History,
    LayoutDashboard
} from 'lucide-react';

interface CategoryInfo {
    count: number;
    total_value: number;
}

interface Transaction {
    category: string;
    description: string;
    value: number;
    date: string;
    type: string;
}

interface DashboardData {
    total_transactions: number;
    total_debit: number;
    total_credit: number;
    balance: number;
    categories: Record<string, CategoryInfo>;
    transactions: Transaction[];
}

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<DashboardData | null>(null);

    useEffect(() => {
        const dataStr = localStorage.getItem('financeDashboardData');
        if (!dataStr) {
            navigate('/upload');
            return;
        }
        setData(JSON.parse(dataStr));
    }, [navigate]);

    if (!data) return null;

    return (
        <NeonLayout>
            <div className="max-w-6xl mx-auto space-y-8 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <LayoutDashboard className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Analysis</h1>
                        </div>
                        <p className="text-muted-foreground">Real-time breakdown of your categorized spending</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/upload')}
                            className="inline-flex items-center px-5 py-2.5 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all shadow-lg active:scale-95"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Upload
                        </button>
                    </div>
                </div>

                {/* Summary Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                    <StatCard title="Total Transactions" value={data.total_transactions.toString()} icon={<History className="w-4 h-4" />} />
                    <StatCard
                        title="Total Debit"
                        value={formatCurrency(data.total_debit)}
                        type="debit"
                        icon={<TrendingDown className="w-4 h-4" />}
                    />
                    <StatCard
                        title="Total Credit"
                        value={formatCurrency(data.total_credit)}
                        type="credit"
                        icon={<TrendingUp className="w-4 h-4" />}
                    />
                    <StatCard
                        title="Final Balance"
                        value={formatCurrency(data.balance)}
                        highlight={data.balance >= 0 ? 'emerald' : 'red'}
                        icon={<Wallet className="w-4 h-4" />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Category List */}
                    <div className="lg:col-span-1 space-y-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-6">Execution Categories</h2>
                        <div className="space-y-3">
                            {Object.entries(data.categories)
                                .sort((a, b) => b[1].total_value - a[1].total_value)
                                .map(([name, info]) => (
                                    <CategoryItem key={name} name={name} info={info} />
                                ))}
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="lg:col-span-2 space-y-4 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-6">Recent Activity</h2>
                        <div className="bg-card/50 backdrop-blur-md border border-border rounded-3xl overflow-hidden shadow-2xl">
                            <div className="max-h-[500px] overflow-y-auto scrollbar-premium scroll-smooth focus:scroll-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="sticky top-0 bg-muted/90 backdrop-blur-xl text-muted-foreground font-medium border-b border-border z-10">
                                        <tr>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Description</th>
                                            <th className="px-6 py-4">Category</th>
                                            <th className="px-6 py-4 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-800/50">
                                        {data.transactions.map((t, i) => (
                                            <TransactionRow key={i} transaction={t} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NeonLayout>
    );
};

const StatCard = ({ title, value, type, highlight, icon }: any) => (
    <div className={cn(
        "bg-card/40 backdrop-blur-md p-6 rounded-3xl border border-border transition-all hover:border-neutral-700/50 group",
        type === 'debit' && "border-l-4 border-l-red-500/30",
        type === 'credit' && "border-l-4 border-l-emerald-500/30"
    )}>
        <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
            <div className="p-1.5 rounded-lg bg-background border border-border text-muted-foreground group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-colors">
                {icon}
            </div>
        </div>
        <p className={cn(
            "text-2xl font-bold tracking-tight",
            highlight === 'emerald' ? 'text-emerald-500' :
                highlight === 'red' ? 'text-red-500' :
                    type === 'debit' ? 'text-red-500' :
                        type === 'credit' ? 'text-emerald-500' : 'text-foreground'
        )}>
            {value}
        </p>
    </div>
);

const CategoryItem = ({ name, info }: { name: string, info: CategoryInfo }) => (
    <div className="bg-card/40 backdrop-blur-md p-4 flex items-center justify-between border border-border rounded-2xl hover:border-emerald-500/30 transition-all group active:scale-[0.98]">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors" />
            <div>
                <p className="font-medium capitalize text-sm text-foreground">{name}</p>
                <p className="text-[10px] text-muted-foreground">{info.count} entries</p>
            </div>
        </div>
        <p className="font-bold text-sm text-foreground">{formatCurrency(info.total_value)}</p>
    </div>
);

const TransactionRow = ({ transaction }: { transaction: Transaction }) => {
    const isDebit = transaction.type.toLowerCase() === 'debit';

    return (
        <tr className="hover:bg-accent/40 transition-colors group">
            <td className="px-6 py-4 text-muted-foreground text-xs tabular-nums">{transaction.date}</td>
            <td className="px-6 py-4">
                <p className="font-medium text-foreground">{transaction.description}</p>
            </td>
            <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-full bg-secondary border border-border text-[9px] font-semibold uppercase tracking-wider text-secondary-foreground group-hover:border-emerald-500/20 group-hover:text-emerald-500 transition-colors">
                    {transaction.category}
                </span>
            </td>
            <td className={cn(
                "px-6 py-4 text-right font-bold tabular-nums text-xs",
                isDebit ? 'text-red-400' : 'text-emerald-400'
            )}>
                {isDebit ? '-' : '+'}{formatCurrency(Math.abs(transaction.value))}
            </td>
        </tr>
    );
};

export default DashboardPage;

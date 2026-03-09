import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NeonLayout from '../components/layout/neon-layout';
import { CloudUpload, FileText, CheckCircle2, AlertCircle, X } from 'lucide-react';

const n8nWebhookUrl = 'https://primary-production-af44.up.railway.app/webhook/csv-upload-api';

const UploadPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => {
        if (!file.name.endsWith('.csv')) {
            setError('Please select a valid .csv file.');
            return;
        }
        setSelectedFile(file);
        setError(null);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Select a CSV file first');
            return;
        }

        setIsProcessing(true);
        const formData = new FormData();
        formData.append('data', selectedFile);

        try {
            const response = await fetch(n8nWebhookUrl, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Process failed. Please check the network connection.');
            }

            const result = await response.json();
            localStorage.setItem('financeDashboardData', JSON.stringify(result));
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <NeonLayout>
            <div className="sm:px-8 sm:py-5 bg-card/90 border-border border rounded-3xl mx-auto max-w-[400px] pt-5 px-6 pb-5 relative shadow-2xl backdrop-blur-xl transition-colors duration-300">
                {/* Loading Overlay */}
                {isProcessing && (
                    <div className="absolute inset-0 z-50 rounded-3xl flex flex-col items-center justify-center bg-neutral-950/80 backdrop-blur-sm">
                        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <p className="text-sm font-medium text-emerald-400">Processing with AI...</p>
                        <p className="text-[11px] text-neutral-500 mt-1">This may take a few seconds</p>
                    </div>
                )}

                <div className="flex justify-center">
                    <div className="flex bg-neutral-900 w-14 h-14 rounded-2xl relative shadow-[0_0_0_1px_rgba(82,82,91,0.7)] items-center justify-center">
                        <div className="flex bg-neutral-950 w-10 h-10 rounded-2xl relative items-center justify-center">
                            <CloudUpload className="w-6 h-6 text-emerald-400" />
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <h1 className="text-[22px] leading-tight tracking-tight font-semibold text-foreground text-wrap">
                        Upload Finance Data
                    </h1>
                    <p className="mt-2 text-sm font-normal text-muted-foreground">
                        Add your CSV archive to start categorization
                    </p>
                </div>

                <div className="mt-5 space-y-3">
                    <div className="space-y-2">
                        <label className="block text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Archive Upload
                        </label>
                        {!selectedFile ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center rounded-2xl bg-background/40 py-5 px-4 cursor-pointer border-2 border-dashed transition-all ${isDragging ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-border hover:border-neutral-700'
                                    }`}
                            >
                                <FileText className={`w-8 h-8 mb-3 transition-colors ${isDragging ? 'text-emerald-400' : 'text-neutral-600'}`} />
                                <p className="text-sm text-muted-foreground font-medium">Click to select or drag CSV here</p>
                                <p className="text-[11px] text-neutral-600 mt-1">Maximum size: 10MB</p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".csv"
                                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-background/60 border border-border">
                                <div className="flex items-center">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-3" />
                                    <span className="text-xs text-foreground font-medium truncate max-w-[150px]">
                                        {selectedFile.name}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="p-1 hover:bg-neutral-800 rounded-lg transition-colors group"
                                >
                                    <X className="w-4 h-4 text-neutral-500 group-hover:text-red-400 transition-colors" />
                                </button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] text-red-400">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || isProcessing}
                        className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-[0_14px_35px_rgba(16,185,129,0.35)] hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                    >
                        Process CSV Archive
                    </button>
                </div>

                <p className="mt-5 pt-1 text-[11px] leading-relaxed text-neutral-500 text-center">
                    Your data is processed securely by our Financial AI Agent.
                    <br />By uploading, you agree to our{' '}
                    <a className="font-medium text-neutral-200 hover:text-emerald-400" href="#">Processing Terms</a>.
                </p>
            </div>
        </NeonLayout>
    );
};

export default UploadPage;

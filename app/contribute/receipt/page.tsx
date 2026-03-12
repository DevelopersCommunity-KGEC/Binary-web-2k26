'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

interface ReceiptResult {
  _id: string;
  name: string;
  yearOfPassing: number;
  amount: number;
  razorpayOrderId: string;
  createdAt: string;
}

export default function ReceiptLookupPage() {
  const [name, setName] = useState('');
  const [results, setResults] = useState<ReceiptResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (name.trim().length < 2) {
        setError('Please enter at least 2 characters');
        return;
      }

      setLoading(true);
      setError('');
      setSearched(true);

      try {
        const res = await fetch(`/api/lookup-receipt?name=${encodeURIComponent(name.trim())}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Search failed');
        setResults(data.results);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [name]
  );

  return (
    <div className="relative min-h-screen bg-dark-bg">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 z-[99] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12">
        {/* Navigation */}
        <div className="absolute top-6 left-6 flex gap-4">
          <Link
            href="/"
            className="text-neon font-pixel text-sm hover:underline transition-opacity opacity-70 hover:opacity-100"
          >
            ← Home
          </Link>
          <Link
            href="/contribute"
            className="text-neon font-pixel text-sm hover:underline transition-opacity opacity-70 hover:opacity-100"
          >
            Contribute
          </Link>
        </div>

        <div className="mt-16 w-full max-w-lg text-center">
          <h1
            className="font-pixel text-neon font-bold text-2xl md:text-3xl mb-4"
            style={{ textShadow: '0 0 20px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.15)' }}
          >
            Service Unavailable
          </h1>
          <p className="text-green-muted font-pixel text-sm">
            The receipt lookup service is temporarily disabled.
          </p>
        </div>

        {/* 
        <div className="mt-16 w-full max-w-lg">
          <h1
            className="font-pixel text-neon font-bold text-2xl md:text-4xl mb-4 text-center"
            style={{ textShadow: '0 0 20px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.15)' }}
          >
            Find Your Receipt
          </h1>

          <div className="w-16 h-[3px] bg-neon mx-auto mb-8 rounded-sm shadow-[0_0_12px_rgba(0,255,65,0.3)]" />

          <p className="text-green-muted font-pixel text-sm text-center mb-8">
            Search by the name you used during payment to find and download your invoice.
          </p>

          <form onSubmit={handleSearch} className="flex gap-3 mb-8">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="flex-1 bg-dark-surface border border-border rounded-lg px-4 py-3 text-[#e0ffe0] font-pixel text-base placeholder:text-green-muted focus:outline-none focus:ring-2 focus:ring-neon focus:border-neon transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="font-pixel text-sm font-bold tracking-[1px] uppercase border-2 border-neon bg-transparent text-neon hover:bg-neon hover:text-dark-bg px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {loading ? '...' : 'Search'}
            </button>
          </form>

          {error && (
            <div className="p-3 border border-red-500/30 rounded-lg bg-red-500/5 text-center mb-6">
              <p className="font-pixel text-red-400 text-sm">{error}</p>
            </div>
          )}

          {searched && !error && results.length === 0 && (
            <div className="p-6 border border-border rounded-xl bg-dark-card text-center">
              <p className="font-pixel text-green-muted text-sm">
                No paid contributions found for &ldquo;{name}&rdquo;
              </p>
              <p className="font-pixel text-green-muted text-xs mt-2">
                Make sure you enter the exact name used during payment.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              {results.map((r) => (
                <div
                  key={r._id}
                  className="border border-border rounded-xl bg-dark-card p-5"
                  style={{
                    animation: 'pulse-glow 3s ease-in-out infinite',
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <p className="font-pixel text-[#e0ffe0] font-bold text-base">
                        {r.name}
                      </p>
                      <p className="font-pixel text-green-muted text-xs">
                        Batch {r.yearOfPassing}
                      </p>
                      <p className="font-pixel text-neon text-lg font-bold">
                        ₹{r.amount.toLocaleString('en-IN')}
                      </p>
                      <p className="font-pixel text-green-muted text-xs">
                        {new Date(r.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <a
                      href={`/api/generate-invoice?orderId=${r.razorpayOrderId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 font-pixel text-xs font-bold tracking-[1px] uppercase border-2 border-neon bg-neon text-dark-bg hover:bg-transparent hover:text-neon px-4 py-2 rounded-lg transition-all duration-300"
                    >
                      Invoice
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        */}
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { name: string };
  theme: { color: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function ContributePage() {
  const [name, setName] = useState('');
  const [yearOfPassing, setYearOfPassing] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [paidOrderId, setPaidOrderId] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setStatus('idle');
      setMessage('');

      try {
        // Load Razorpay script
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          throw new Error('Failed to load Razorpay SDK. Check your internet connection.');
        }

        // Create order
        const orderRes = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            yearOfPassing: Number(yearOfPassing),
            amount: Number(amount),
          }),
        });

        const orderData = await orderRes.json();
        if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order');

        // Open Razorpay checkout
        const options: RazorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: Number(amount) * 100,
          currency: 'INR',
          name: 'Binary - KGEC',
          description: `Contribution by ${name}`,
          order_id: orderData.orderId,
          handler: async (response: RazorpayResponse) => {
            try {
              const verifyRes = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                setStatus('success');
                setMessage('Payment successful! Thank you for supporting Binary 🎉');
                setPaidOrderId(response.razorpay_order_id);
                setName('');
                setYearOfPassing('');
                setAmount('');
              } else {
                setStatus('error');
                setMessage('Payment verification failed. Please contact support.');
              }
            } catch {
              setStatus('error');
              setMessage('Something went wrong during verification.');
            }
            setLoading(false);
          },
          prefill: { name },
          theme: { color: '#00ff41' },
          modal: {
            ondismiss: () => {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err: unknown) {
        setLoading(false);
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Something went wrong');
      }
    },
    [name, yearOfPassing, amount]
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Back link */}
        <Link
          href="/"
          className="absolute top-6 left-6 text-neon font-pixel text-sm hover:underline transition-opacity opacity-70 hover:opacity-100"
        >
          ← Back to Home
        </Link>

        <h1
          className="font-pixel text-neon font-bold text-3xl md:text-5xl mb-4 text-center"
          style={{ textShadow: '0 0 20px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.15)' }}
        >
          Contribute to Binary
        </h1>

        <div className="w-16 h-[3px] bg-neon mx-auto mb-10 rounded-sm shadow-[0_0_12px_rgba(0,255,65,0.3)]" />

        {/* Existing Razorpay form - temporarily disabled */}
        {false && (
          <>
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md space-y-6 bg-dark-card border border-border rounded-2xl p-8"
              style={{
                animation: 'pulse-glow 3s ease-in-out infinite',
              }}
            >
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block font-pixel text-green-text text-sm tracking-wide uppercase">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-dark-surface border border-border rounded-lg px-4 py-3 text-[#e0ffe0] font-pixel text-base placeholder:text-green-muted focus:outline-none focus:ring-2 focus:ring-neon focus:border-neon transition-all"
                />
              </div>

              {/* Year of Passing */}
              <div className="space-y-2">
                <label htmlFor="yearOfPassing" className="block font-pixel text-green-text text-sm tracking-wide uppercase">
                  Year of Passing
                </label>
                <input
                  id="yearOfPassing"
                  type="number"
                  required
                  min={1990}
                  max={2040}
                  value={yearOfPassing}
                  onChange={(e) => setYearOfPassing(e.target.value)}
                  placeholder="e.g. 2026"
                  className="w-full bg-dark-surface border border-border rounded-lg px-4 py-3 text-[#e0ffe0] font-pixel text-base placeholder:text-green-muted focus:outline-none focus:ring-2 focus:ring-neon focus:border-neon transition-all"
                />
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <label htmlFor="amount" className="block font-pixel text-green-text text-sm tracking-wide uppercase">
                  Amount (₹)
                </label>
                <input
                  id="amount"
                  type="number"
                  required
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount in INR"
                  className="w-full bg-dark-surface border border-border rounded-lg px-4 py-3 text-[#e0ffe0] font-pixel text-base placeholder:text-green-muted focus:outline-none focus:ring-2 focus:ring-neon focus:border-neon transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full font-pixel text-lg font-bold tracking-[2px] uppercase border-2 border-neon bg-transparent text-neon hover:bg-neon hover:text-dark-bg px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </button>

              {/* Status message */}
              {status === 'success' && (
                <div className="mt-4 p-4 border border-neon/30 rounded-lg bg-neon/5 text-center space-y-3">
                  <p className="font-pixel text-neon text-sm">{message}</p>
                  {paidOrderId && (
                    <a
                      href={`/api/generate-invoice?orderId=${paidOrderId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-pixel text-sm font-bold tracking-[1px] uppercase border-2 border-neon bg-neon text-dark-bg hover:bg-transparent hover:text-neon px-5 py-2.5 rounded-lg transition-all duration-300"
                    >
                      Download Invoice
                    </a>
                  )}
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 p-4 border border-red-500/30 rounded-lg bg-red-500/5 text-center">
                  <p className="font-pixel text-red-400 text-sm">{message}</p>
                </div>
              )}
            </form>

            <p className="mt-8 text-green-muted font-pixel text-xs text-center max-w-sm">
              Your contribution helps fuel innovation at Binary — KGEC Hackathon 2026.
              Payments are securely processed via Razorpay.
            </p>

            <Link
              href="/contribute/receipt"
              className="mt-4 font-pixel text-neon text-xs hover:underline transition-opacity opacity-60 hover:opacity-100"
            >
              Already paid? Find your receipt →
            </Link>
          </>
        )}

        {/* QR Code Section */}
        <div className="w-full max-w-md flex flex-col items-center space-y-6 bg-dark-card border border-border rounded-2xl p-8 shadow-[0_0_15px_rgba(0,255,65,0.1)]" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
          <p className="font-pixel text-neon text-center text-lg leading-relaxed">
            Scan the QR Code to <br/> Contribute to Binary
          </p>
          
          <div className="w-56 h-56 bg-dark-surface border-2 border-neon rounded-xl p-4 relative flex flex-col items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/qr.jpg" alt="UPI QR Code" className="w-full h-full object-contain rounded-lg" />
          </div>
          
          <div className="space-y-4 text-center w-full mt-2">
            <div className="bg-dark-surface py-3 px-4 rounded-lg border border-border">
              <p className="text-green-text font-sans font-medium text-md tracking-wide">UPI ID: 7439817750@superyes</p>
            </div>
            <p className="text-green-muted font-pixel text-xs max-w-[250px] mx-auto leading-relaxed mt-4">
              Your contribution helps fuel innovation at Binary — KGEC Hackathon 2026.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

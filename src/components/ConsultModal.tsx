'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, User, Phone, Mail } from 'lucide-react';

/* ─── Global Open/Close Helper ───────────────────────────────────────────── */
type Listener = () => void;
const listeners: Set<Listener> = new Set();
export function openConsultModal() {
  listeners.forEach(fn => fn());
}

/* ─── Minimal Clean Field Component ──────────────────────────────────────── */
function MinimalField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="relative flex flex-col group">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] font-medium tracking-wide uppercase text-zinc-500 transition-colors group-focus-within:text-black">
          {label}
        </label>
        {error && (
          <span className="text-[10px] font-medium text-zinc-900 tracking-tight">
            {error}
          </span>
        )}
      </div>

      <div
        className={`relative flex items-center bg-zinc-50/80 hover:bg-zinc-50 border rounded-xl px-3.5 py-3 transition-all duration-200 ${
          error
            ? 'border-black ring-1 ring-black'
            : 'border-zinc-200 group-focus-within:border-black group-focus-within:bg-white group-focus-within:ring-1 group-focus-within:ring-black'
        }`}
      >
        <Icon
          className="w-4 h-4 text-zinc-400 group-focus-within:text-black transition-colors shrink-0 mr-3"
          strokeWidth={1.5}
        />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-transparent text-sm font-normal text-black placeholder:text-zinc-400 outline-none"
        />
      </div>
    </div>
  );
}

/* ─── Main Modal Component ────────────────────────────────────────────────── */
export default function ConsultModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handler: Listener = () => setOpen(true);
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setName(''); setPhone(''); setEmail('');
      setErrors({}); setLoading(false); setSuccess(false);
    }, 400);
  }

  function validate() {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Required';
    if (!phone.trim()) e.phone = 'Required';
    else if (!/^[+\d\s\-()\d]{7,15}$/.test(phone.trim())) e.phone = 'Invalid phone';
    if (!email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Invalid email';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim() }),
      });
      if (res.ok) setSuccess(true);
      else {
        const data = await res.json();
        setErrors({ email: data.message || 'Something went wrong.' });
      }
    } catch {
      setErrors({ email: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Minimal Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] border border-zinc-200 overflow-hidden pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-black flex items-center justify-center transition-colors duration-150 z-10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center text-center px-8 py-12"
                  >
                    <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-4 shadow-sm">
                      <Check className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <h2 className="text-xl font-bold text-black tracking-tight mb-2">
                      Request Confirmed
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-6">
                      Thanks, <strong className="font-semibold text-black">{name.split(' ')[0]}</strong>. We&apos;ll be in touch shortly to schedule your call.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-medium text-xs transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 sm:p-7"
                  >
                    {/* Minimal Header */}
                    <div className="mb-6 pr-6">
                      <h2 className="text-xl sm:text-[22px] font-bold text-black tracking-tight mb-1.5">
                        Free Consultation
                      </h2>
                      <p className="text-xs sm:text-[13px] text-zinc-500 leading-normal">
                        Share your contact details below to secure a meeting slot.
                      </p>
                    </div>

                    {/* Form Layout */}
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
                      <MinimalField
                        label="Full Name"
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={name}
                        onChange={setName}
                        error={errors.name}
                        icon={User}
                      />
                      <MinimalField
                        label="Phone Number"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={setPhone}
                        error={errors.phone}
                        icon={Phone}
                      />
                      <MinimalField
                        label="Work Email"
                        type="email"
                        placeholder="alex@company.com"
                        value={email}
                        onChange={setEmail}
                        error={errors.email}
                        icon={Mail}
                      />

                      {/* Clean Black Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 flex items-center justify-center gap-2 w-full h-11 bg-black hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-all duration-150 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <>
                            <span>Confirm Request</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      {/* Minimal Monochrome Trust Signals */}
                      <div className="mt-1 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-normal">
                        <span>100% Confidential</span>
                        <span>•</span>
                        <span>Fast Response</span>
                        <span>•</span>
                        <span>Zero Obligations</span>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
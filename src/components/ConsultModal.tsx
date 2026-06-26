'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

/* ─── Global Open/Close Helper ───────────────────────────────────────────── */
type Listener = () => void;
const listeners: Set<Listener> = new Set();
export function openConsultModal() {
  listeners.forEach(fn => fn());
}

/* ─── Ultra-Minimal Input Field ───────────────────────────────────────────── */
function MinimalField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="relative flex flex-col group pb-1">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1 transition-colors group-focus-within:text-zinc-900">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-transparent border-b py-2 text-[14px] text-zinc-900 placeholder:text-zinc-300 outline-none transition-all duration-300 ${error
            ? 'border-red-400 focus:border-red-500'
            : 'border-zinc-200 focus:border-zinc-900'
          }`}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-3.5 left-0 text-[10px] font-medium text-red-500 tracking-wide"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
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
      setErrors({ email: 'Network error.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-md z-[9998]"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-[380px] bg-white rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden pointer-events-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900 transition-colors duration-200 z-10"
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center px-8 py-14"
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-900 flex items-center justify-center mb-4">
                      <Check className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <h2 className="text-lg font-semibold text-zinc-900 tracking-tight mb-1">
                      Request Received
                    </h2>
                    <p className="text-zinc-500 text-[13px] leading-relaxed">
                      Thanks, <span className="font-medium text-zinc-900">{name.split(' ')[0]}</span>. We'll speak with you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 pt-7"
                  >
                    {/* Header Group */}
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-zinc-900 tracking-tight mb-1">
                        Free Consultation
                      </h2>
                      <p className="text-[13px] text-zinc-400 leading-normal pr-4">
                        Provide your contact details below to secure a meeting slot.
                      </p>
                    </div>

                    {/* Form Layout */}
                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                      <MinimalField label="Full Name" type="text" placeholder="Jane Doe" value={name} onChange={setName} error={errors.name} />
                      <MinimalField label="Phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={setPhone} error={errors.phone} />
                      <MinimalField label="Email" type="email" placeholder="jane@company.com" value={email} onChange={setEmail} error={errors.email} />

                      {/* Unified Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 flex items-center justify-center w-full h-11 bg-zinc-950 text-white text-[13px] font-medium rounded-xl hover:bg-zinc-900 disabled:opacity-50 disabled:hover:bg-zinc-950 transition-all active:scale-[0.99]"
                      >
                        {loading ? (
                          <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                        ) : (
                          'Confirm Request'
                        )}
                      </button>
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
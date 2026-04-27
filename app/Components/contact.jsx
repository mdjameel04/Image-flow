"use client"

import React, { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [focused, setFocused] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500)); // replace with real API call
    console.log(form);
    setForm({ name: "", email: "", message: "" });
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080810] relative overflow-hidden px-4"  id='contact mt-6'>

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full bg-indigo-700/15 blur-[100px]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">

        {/* Logo badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs tracking-widest uppercase">
            ⚡ ImageFlow
          </span>
        </div>

        {sent ? (
          /* Success state */
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl text-purple-400">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-white">Message Sent!</h2>
            <p className="text-white/40 text-sm">Thanks for reaching out. We'll get back to you within 24 hours.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-2 px-5 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm transition"
            >
              Send another
            </button>
          </div>
        ) : (
          /* Form card */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8 space-y-4"
          >
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">Contact Us</h2>
              <p className="text-white/40 text-sm mt-1">We read every message and reply fast.</p>
            </div>

            {/* Name */}
            <div>
              <label className="text-xs text-white/40 tracking-widest uppercase block mb-1.5">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name......."
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                required
                className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition ${
                  focused === "name"
                    ? "border-purple-500/60 bg-white/[0.06]"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs text-white/40 tracking-widest uppercase block mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                required
                className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition ${
                  focused === "email"
                    ? "border-purple-500/60 bg-white/[0.06]"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-xs text-white/40 tracking-widest uppercase block mb-1.5">Message</label>
              <textarea
                name="message"
                placeholder="Tell us what's on your mind..."
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused("")}
                rows={4}
                required
                className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 resize-none focus:outline-none transition ${
                  focused === "message"
                    ? "border-purple-500/60 bg-white/[0.06]"
                    : "border-white/[0.08] hover:border-white/20"
                }`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition ${
                sending
                  ? "bg-purple-600/50 text-white/50 cursor-wait"
                  : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40"
              }`}
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            <p className="text-center text-xs text-white/20 pt-1">We respect your privacy. No spam, ever.</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
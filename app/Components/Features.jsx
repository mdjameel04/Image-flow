"use client"

import { useState } from "react"

const STYLES = ["Photorealistic", "Anime", "Oil painting", "3D render", "Pixel art", "Watercolor"]
const RATIOS = ["1:1", "16:9", "4:5", "9:16", "4K ✦"]

export default function Features() {
  const [activeStyle, setActiveStyle] = useState("Photorealistic")
  const [activeRatio, setActiveRatio] = useState("4:5")

  return (
    <section id="features" className=" py-10 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="block w-[22px] h-px bg-violet-400/70" />
          <span className="text-[11px] tracking-[2.5px] uppercase text-violet-400/80 font-medium">
            Capabilities
          </span>
        </div>
    
        {/* Heading */}
        <h2 className="font-serif text-[clamp(36px,5.5vw,60px)] leading-[1.02] tracking-[-2px] mb-16">
          Everything you need to<br />
          <em className="not-italic bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            create without limits
          </em>
        </h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">

          {/* 1 · Instant generation — wide */}
          <div className="md:col-span-2 group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d12] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/25 hover:shadow-[0_8px_40px_rgba(124,58,237,0.1)]">
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.12),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[20px] mb-5 bg-violet-500/15 shadow-[0_0_0_1px_rgba(124,58,237,0.2)]">⚡</div>
              <h3 className="text-[15.5px] font-medium text-white/90 mb-2.5">Instant generation</h3>
              <p className="text-[13px] text-white/42 leading-[1.72]">
                From prompt to pixel in under 5 seconds. Powered by the latest diffusion models on dedicated GPU clusters — no queue, no wait.
              </p>
              <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-[11px] bg-violet-400/10 border border-violet-400/20 text-violet-400">
                ✦ Avg. 3.8s per image
              </div>
              {/* Prompt demo bar */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-black/30 px-4 py-3">
                <span className="flex-1 text-[12px] text-white/40 truncate">A solarpunk city bathed in golden hour light…</span>
                <button className="shrink-0 rounded-lg bg-gradient-to-br from-violet-600 to-purple-500 px-3 py-1.5 text-[11px] font-medium text-white">
                  Generate ✦
                </button>
              </div>
            </div>
          </div>

          {/* 2 · Privacy */}
          <div className="group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d12] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/25 hover:shadow-[0_8px_40px_rgba(20,184,166,0.08)]">
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_0%_0%,rgba(20,184,166,0.09),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[20px] mb-5 bg-teal-500/12 shadow-[0_0_0_1px_rgba(20,184,166,0.18)]">🔒</div>
              <h3 className="text-[15.5px] font-medium text-white/90 mb-2.5">Private by default</h3>
              <p className="text-[13px] text-white/42 leading-[1.72]">
                Your prompts and images are yours alone. End-to-end encrypted, never used for training without consent.
              </p>
              <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-[11px] bg-teal-400/10 border border-teal-400/20 text-teal-400">
                ✦ E2E encrypted
              </div>
            </div>
          </div>

          {/* 3 · Art styles */}
          <div className="group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d12] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-400/25 hover:shadow-[0_8px_40px_rgba(244,114,182,0.08)]">
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_0%_0%,rgba(244,114,182,0.10),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[20px] mb-5 bg-fuchsia-500/12 shadow-[0_0_0_1px_rgba(244,114,182,0.18)]">🎨</div>
              <h3 className="text-[15.5px] font-medium text-white/90 mb-2.5">20+ art styles</h3>
              <p className="text-[13px] text-white/42 leading-[1.72] mb-4">Switch styles with one click — no re-prompting needed.</p>
              <div className="flex flex-wrap gap-1.5">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveStyle(s)}
                    className={`px-2.5 py-1 rounded-lg text-[11.5px] border transition-all duration-200 ${
                      activeStyle === s
                        ? "border-violet-400/45 text-violet-400 bg-violet-400/08"
                        : "border-white/12 text-white/40 hover:border-violet-400/30 hover:text-violet-300 bg-white/[0.02]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4 · Resolution */}
          <div className="group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d12] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/25 hover:shadow-[0_8px_40px_rgba(245,158,11,0.08)]">
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_0%_0%,rgba(245,158,11,0.09),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[20px] mb-5 bg-amber-500/12 shadow-[0_0_0_1px_rgba(245,158,11,0.18)]">📐</div>
              <h3 className="text-[15.5px] font-medium text-white/90 mb-2.5">Any size, up to 4K</h3>
              <p className="text-[13px] text-white/42 leading-[1.72] mb-4">Square, portrait, cinematic — export at any ratio in print-ready quality.</p>
              <div className="flex flex-wrap gap-2">
                {RATIOS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRatio(r)}
                    className={`px-3 py-1.5 rounded-full text-[11.5px] border transition-all duration-200 ${
                      activeRatio === r
                        ? "border-amber-400/45 text-amber-400 bg-amber-400/07"
                        : "border-white/[0.07] text-white/40 hover:border-amber-400/30 hover:text-amber-300"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 5 · Inpainting */}
          <div className="group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d12] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/25 hover:shadow-[0_8px_40px_rgba(124,58,237,0.1)]">
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_0%_0%,rgba(124,58,237,0.12),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[20px] mb-5 bg-violet-500/15 shadow-[0_0_0_1px_rgba(124,58,237,0.2)]">✏️</div>
              <h3 className="text-[15.5px] font-medium text-white/90 mb-2.5">Inpainting & editing</h3>
              <p className="text-[13px] text-white/42 leading-[1.72]">
                Brush over any region and describe the change. Surgical edits — no full regeneration needed.
              </p>
              <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-[11px] bg-violet-400/10 border border-violet-400/20 text-violet-400">
                ✦ Mask-based editing
              </div>
            </div>
          </div>

          {/* 6 · API — wide
          <div className="md:col-span-2 group relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#0d0d12] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/25 hover:shadow-[0_8px_40px_rgba(59,130,246,0.08)]">
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.10),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-[20px] mb-5 bg-blue-500/12 shadow-[0_0_0_1px_rgba(59,130,246,0.2)]">🔌</div>
              <h3 className="text-[15.5px] font-medium text-white/90 mb-2.5">Developer API</h3>
              <p className="text-[13px] text-white/42 leading-[1.72]">
                Integrate generation directly into your product. Simple REST API with SDKs for Node.js and Python. Webhooks, batch jobs, and streaming supported.
              </p>
              Code snippet
              <div className="mt-4 rounded-xl border border-white/[0.07] bg-black/40 px-4 py-3.5 font-mono text-[11.5px] leading-[1.7] text-white/50">
                <span className="text-violet-400">const</span> image = <span className="text-violet-400">await</span>{" "}
                <span className="text-fuchsia-400">imageflow</span>.generate({"{"}<br />
                &nbsp;&nbsp;prompt: <span className="text-emerald-400">"a neon fox in the rain"</span>,<br />
                &nbsp;&nbsp;style: <span className="text-emerald-400">"photorealistic"</span>,<br />
                &nbsp;&nbsp;size: <span className="text-emerald-400">"1024x1024"</span>,<br />
                {"}"});
              </div>
              <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-[11px] bg-blue-400/10 border border-blue-400/20 text-blue-400">
                ✦ REST · Node · Python
              </div> */}
            {/* </div> */}
          {/* </div> */}

        </div>
      </div>
    </section>
  )
}
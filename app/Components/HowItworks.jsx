import React from "react"

const steps = [
  {
    num: "1",
    icon: "✍️",
    title: "Write your prompt",
    desc: "Describe your vision in plain language — vivid details, moods, styles, or just a single word. Our AI understands context, not just keywords.",
    tag: "✦ No design skills needed",
    delay: "delay-100",
  },
  {
    num: "2",
    icon: "🎨",
    title: "Choose your style",
    desc: "Pick from 20+ art styles — photorealistic, anime, oil painting, 3D render, pixel art. Set your aspect ratio and crank up the detail level.",
    tag: "✦ 20+ styles available",
    delay: "delay-300",
  },
  {
    num: "3",
    icon: "⚡",
    title: "Generate & download",
    desc: "Get 4 variations in under 5 seconds. Save your favorites at full 4K resolution, ready for print, social, or your next big project.",
    tag: "✦ 4K · ready in <5s",
    delay: "delay-500",
  },
]

const stats = [
  { val: "120k+", label: "Creators using\nImageFlow daily" },
  { val: "<5s",   label: "Average generation\ntime per image" },
  { val: "∞",     label: "Possible outputs from\na single prompt" },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-24 px-6 border-t border-white/[0.07]"
    >
      <div className="max-w-5xl mx-auto">

        {/* Label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="block w-6 h-px bg-violet-400/60" />
          <span className="text-[11px] tracking-[2px] uppercase text-violet-400/80 font-medium">
            Process
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-[clamp(38px,6vw,64px)] leading-none tracking-[-2px] mb-16">
          Three steps.<br />
          <em className="not-italic bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Infinite images.
          </em>
        </h2>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_48px_1fr_48px_1fr] items-start gap-6 md:gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              {/* Step card */}
              <div
                key={step.num}
                className={`flex flex-col items-center text-center group animate-fade-up ${step.delay}`}
              >
                {/* Orb */}
                <div className="relative w-14 h-14 mb-6 flex-shrink-0">
                  {/* Spinning ring */}
                  <div className="absolute inset-[-6px] rounded-full border border-violet-400/15 animate-spin [animation-duration:8s]">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400 shadow-[0_0_8px_theme(colors.violet.400)]" />
                  </div>
                  {/* Inner */}
                  <div className="relative z-10 w-full h-full rounded-full flex items-center justify-center bg-[#0d0d12] border border-violet-400/25 text-violet-400 font-serif text-xl transition-all duration-300 group-hover:border-violet-400/60 group-hover:shadow-[0_0_24px_rgba(124,58,237,0.4)]">
                    {step.num}
                  </div>
                </div>

                {/* Card */}
                <div className="relative w-full overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0d0d12] p-7 transition-all duration-300 group-hover:border-violet-400/20 group-hover:-translate-y-1">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.08),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <span className="text-[28px] mb-4 block drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]">
                    {step.icon}
                  </span>
                  <h3 className="text-[15px] font-medium text-white/90 mb-3">{step.title}</h3>
                  <p className="text-[13px] text-white/45 leading-[1.7]">{step.desc}</p>
                  <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-[11px] bg-violet-400/10 border border-violet-400/20 text-violet-400">
                    {step.tag}
                  </div>
                </div>
              </div>

              {/* Connector (between steps only) */}
              {i < steps.length - 1 && (
                <div key={`conn-${i}`} className="hidden md:flex items-start pt-7">
                  <div className="relative flex-1 h-px bg-gradient-to-r from-violet-400/50 to-fuchsia-400/50">
                    <span className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {stats.map((s) => (
            <div
              key={s.val}
              className="flex items-center gap-4 rounded-[14px] border border-white/[0.07] bg-[#0d0d12] px-5 py-[22px] transition-colors hover:border-violet-400/20"
            >
              <span className="font-serif text-[30px] leading-none tracking-tight bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {s.val}
              </span>
              <span className="text-[12.5px] text-white/45 leading-[1.5] whitespace-pre-line">
                {s.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
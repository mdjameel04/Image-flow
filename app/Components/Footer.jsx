import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="relative overflow-hidden border-t border-white/[0.07]">
           {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent pointer-events-none" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-[120px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.12),transparent_70%)] pointer-events-none" />

 {/* ── CTA band ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-12 py-[72px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/[0.07]">
        <div>
          <h3 className="font-serif text-[clamp(28px,3.5vw,42px)] leading-[1.08] tracking-[-1.5px] mb-2.5">
            Start creating<br />
            <em className="not-italic bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              for free today.
            </em>
          </h3>
          <p className="text-[13.5px] text-white/38 leading-[1.65] max-w-[360px]">
            Join 120,000+ creators. No credit card required — 50 free images every month, forever.
          </p>
        </div>
        <div className="flex gap-2.5 flex-wrap shrink-0">
          <Link href={"/generate"}>
          <button className="px-6 py-3 rounded-[11px] bg-gradient-to-br from-violet-600 to-purple-500 text-white text-[13px] font-medium border-none cursor-pointer shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_38px_rgba(168,85,247,0.58)] hover:-translate-y-px transition-all duration-200">
            ✦ Get started free
          </button>
          </Link>
        </div>
      </div>
  <div className="mx-auto text-center">
          <div className="mb-3 font-italiano text-5xl ">
            Image<em className="not-italic text-violet-400 font-italiano text-5xl">Flow</em>
          </div>
          <p className="text-[13px] text-white/38 leading-[1.7]  mb-5">
            AI-powered image generation for creators, developers, and dreamers.
          </p>
</div>
       <div className='flex items-center justify-center gap-2 text-gray-500 text-sm'>
   <p className='font-serif'> ©2026 Image  <span className='font-italiano text-2xl'> Flow</span></p>
   <p className=''> .Privacy 
    <span className='ml-2'>
        .Terms
    </span>
   </p>

       </div>
    </div>
  )
}

export default Footer

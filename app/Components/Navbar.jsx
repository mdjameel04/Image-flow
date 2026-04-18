"use client"

import { Button } from "@/components/ui/button"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { Menu, X, Sparkles, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

const MenuOptions = [
  { name: "Features", path: "/#features" },
  { name: "Pricing", path: "/#pricing" },
  { name: "Contact", path: "/#contact" },
]

const Navbar = () => {
  const { user } = useUser()
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(true)
  

  // scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 bg-white/5 backdrop-blur-xl border border-white/10">
      <div
        className={`
          w-full max-w-5xl transition-all duration-500
          ${scrolled
            ? "backdrop-blur-2xl bg-background/80 border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.08)]"
            : "backdrop-blur-xl bg-muted border border-border"
          }
          rounded-2xl px-4 md:px-6 py-3
        `}
      >
        <div className="flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-1 shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/logo.png"
                alt="logo"
                width={500}
                height={500}
                priority
                className="relative h-8 w-auto"
              />
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-white/90">
              Image
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 italic font-bold">
                Flow
              </span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5 bg-white/[0.04] border border-white/[0.07] rounded-xl px-1.5 py-1.5">
            {MenuOptions.map((item) => {
              const isActive = pathname === item.path

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 group
                  ${isActive ? "text-white" : "text-muted-foreground  hover:text-foreground"}`}
                >
                  {item.name}

                  {/* 🎯 Active background */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-muted -z-10" />
                  )}

                  {/* ✨ Animated underline */}
                  <span
                    className={`
                      absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] rounded-full
                      bg-gradient-to-r from-purple-400 to-fuchsia-400
                      transition-all duration-300
                      ${isActive ? "w-6" : "w-0 group-hover:w-6"}
                    `}
                  />
                </Link>
              )
            })}
          </nav>

          {/* ── Right Section ── */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">

            {/* 🌙 Dark Mode Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg bg-white/[0.07] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.12] transition"
            >
              {dark ? "🌙" : "☀️"}
            </button>

            {!user ? (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
                    Sign In
                  </button>
                </SignInButton>

                <SignInButton mode="modal">
                  <button className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_28px_rgba(168,85,247,0.55)] hover:from-purple-500 hover:to-fuchsia-500 active:scale-[0.98] transition-all duration-200 overflow-hidden">
                    <span className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500" />
                    <Sparkles className="h-3.5 w-3.5" />
                    Get Started
                  </button>
                </SignInButton>
              </>
            ) : (
              <>
                <Link href="/dashboard">
                  <button className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white">
                    <Sparkles className="h-3.5 w-3.5" />
                    Dashboard
                  </button>
                </Link>

                <div className="ring-1 ring-white/10 rounded-full hover:ring-purple-400/40 transition flex items-center justify-center">
                  <UserButton />
                </div>
              </>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg bg-white/[0.07] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.12] transition"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300
            ${mobileOpen ? "max-h-screen opacity-100 mt-3" : "max-h-0 opacity-0"}
          `}
        >
          <div className="border-t border-white/[0.07] pt-3 pb-1 flex flex-col gap-1 text-center">
            {MenuOptions.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.07]"
              >
                {item.name}
                <ChevronRight size={14} />
              </Link>
            ))}

            <div className="h-px bg-white/[0.07] my-2" />

            {/* 🌙 Mobile Dark Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="mx-auto mb-2 px-4 py-2 rounded-lg bg-muted text-foreground border-border"
            >
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>

            {!user ? (
              <div className="flex flex-col gap-2 px-1">
                <SignInButton mode="modal">
                  <Button variant="outline" className="text-white">
                    Sign In
                  </Button>
                </SignInButton>

                <SignInButton mode="modal">
                  <Button className="bg-purple-600 text-white">
                    Get Started
                  </Button>
                </SignInButton>
              </div>
            ) : (
              <div className="flex flex-col  gap-2 px-1">
                <Link href="/dashboard">
                  <Button className="bg-purple-600 text-white">
                    Dashboard
                  </Button>
                </Link>
                <UserButton   />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
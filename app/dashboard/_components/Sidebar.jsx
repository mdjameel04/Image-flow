"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

import {
  Menu,
  X,
  ImageIcon,
  User,
  AppWindow,
  Images,
  Plus,
  LayoutGrid,
  CreditCard,
  Wand2,
  LayoutDashboard,
} from "lucide-react"

// Sidebar Item
const SidebarItem = ({ icon, label, href }) => {
  const pathname = usePathname()
  const active = pathname.startsWith(href)

  return (
    <Link href={href} className="group">
      <div
        className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200
        ${active
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"}
      `}
      >
        <div className="transition-transform duration-200 group-hover:scale-110">
          {icon}
        </div>
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  )
}

// Reusable Menu Content
const SidebarContent = () => (
  <>
    {/* Logo */}
    <div className='flex items-center justify-center mt-2 gap-2'>
      <Image src={"/Logo.png"} alt='logo' width={25} height={25} />
      <h1 className='text-2xl font-bold font-italiano'>
        Image <span className='text-purple-600'>Flow</span>
      </h1>
    </div>

    {/* Divider */}
    <div className='border-b border-white/10 w-full mt-3'/>

    {/* Main */}
    <nav className="space-y-2 mt-4">
      <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" href="/dashboard" />
      <SidebarItem icon={<ImageIcon size={18} />} label="Generate" href="/generate" />
      <SidebarItem icon={<Images size={18} />} label="Gallery" href="/Gallery" />
      {/* <SidebarItem icon={<Plus size={18} />} label="Collections" href="/collections" /> */}
    </nav>

    {/* Tools */}
    <p className="text-sm text-white/40 mt-6 mb-2">TOOLS</p>
    <nav className="space-y-2">
      <SidebarItem icon={<Wand2 size={18} />} label="Inpainting" href="/tools/inpainting" />
      <SidebarItem icon={<AppWindow size={18} />} label="Upscale" href="/tools/upscale" />
      <SidebarItem icon={<LayoutGrid size={18} />} label="Styles" href="/tools/styles" />
    </nav>

    {/* Bottom */}
    
    <div className='mt-6'>
      <h1 className=" text-white/40 mt-6 mb-2"> Account</h1>
      <SidebarItem icon={<User size={18} />} label="Profile" href="/profile" />
      <SidebarItem icon={<CreditCard size={18} />} label="Upgrade" href="/upgrade" />
    </div>
  </>
)

// Main Sidebar Component
const Sidebar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* 📱 Mobile Topbar */}
      <div className="md:hidden flex  justify-start gap-1  p-4 border-b border-white/10 bg-[#0B0B0F]">
          <h1 className='text-3xl font-bold font-italiano'>
        Image <span className='text-purple-600'>Flow</span>
      </h1>
        <Menu onClick={() => setOpen(true)} className="cursor-pointer" />
      </div>

      {/* 📱 Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 📱 Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#0B0B0F] z-50 p-4 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Menu</h1>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>

        <SidebarContent />
      </div>

      {/* 💻 Desktop Sidebar */}
      <div className='w-72 bg-[#0B0B0F] border-r border-white/10 p-4 hidden md:flex flex-col h-screen overflow-y-auto'>
        <SidebarContent />
      </div>
    </>
  )
}

export default Sidebar
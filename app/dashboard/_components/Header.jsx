"use client";

import { useUser } from "@clerk/nextjs";
import { Bell } from "lucide-react";

const Header = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

  return (
    <div className="flex items-center justify-between p-4 border-b border-white/10">
      
      {/* Left */}
      <div>
        <h2 className="text-lg font-semibold">
          {greeting}, {user?.firstName} 👋
        </h2>
        <p className="text-sm text-white/40">
          Welcome back
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="relative">
          <input
            placeholder="Search images..."
            className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-purple-500"
          />
          <span className="absolute left-2 top-2 text-gray-400">🔍</span>
        </div>

        {/* New Image Button */}
        <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm">
          + New Image
        </button>

        {/* Notification */}
        {/* <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white" /> */}

        {/* Avatar */}
        <img
          src={user?.imageUrl}
          alt="user"
          className="w-9 h-9 rounded-full border border-white/10"
        />
      </div>
    </div>
  );
};

export default Header;
"use client"
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Header/>
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      
      <div className="text-center max-w-xl">
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          🚧 Feature Coming Soon
        </h1>

        {/* Description */}
        <p className="text-white/60 mb-6">
          We're working hard to bring this feature to life. Stay tuned — it’s coming soon!
        </p>

        {/* Button */}
        <Link href="/dashboard">
          <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg">
            ← Back to Dashboard
          </button>
        </Link>

      </div>

    </div>
  );
}
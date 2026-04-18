"use client";

import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Image, Coins, FolderOpen, Clock, Download } from "lucide-react";

const StatsCard = () => {
  const { user, isLoaded } = useUser();

  const stats = useQuery(
    api.images.GeneratedImages,
    isLoaded && user?.id ? { userId: user.id } : "skip"
  );


const userCredits = useQuery(
api.user.getUserCredits,
 user?.primaryEmailAddress?.emailAddress
    ? { email: user.primaryEmailAddress.emailAddress }
    : "skip"
)

  // ✅ Download handler
  const handleDownload = (imageUrl, prompt) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${prompt.slice(0, 30).replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statItems = [
    {
      icon: <Image className="w-5 h-5 text-purple-400" />,
      label: "Images Generated",
      value: stats?.totalImages ?? 0,
    },
    {
      icon: <Coins className="w-5 h-5 text-yellow-400" />,
      label: "Credits Remaining",
      value: userCredits?.credits ?? 0
    },
    {
      icon: <FolderOpen className="w-5 h-5 text-blue-400" />,
      label: "Collections",
      value: stats?.totalImages ?? 0,
    },
    {
      icon: <Clock className="w-5 h-5 text-green-400" />,
      label: "Avg. Gen Time",
      value: "4.5sec",
    },
  ];

if (!isLoaded || stats === undefined || userCredits === undefined){
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-white/5 border border-white/10 animate-pulse">
              <CardContent className="p-5 h-24" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, i) => (
          <Card key={i} className="bg-white/5 border border-white/10">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white/5">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">{item.label}</p>
                <p className="text-2xl font-semibold text-white">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Images */}
     {/* Recent Images */}
<div>
  <h2 className="text-white/70 text-sm font-medium mb-4">RECENT IMAGES</h2>

  {stats.recentImages.length === 0 ? (
    <div className="text-white/20 text-sm text-center py-12 border border-white/10 rounded-xl">
      No images yet. Go generate some! 🚀
    </div>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {stats.recentImages.slice(0, 4).map((img) => (
        <div
          key={img._id}
          className="group relative rounded-xl overflow-hidden border border-white/10 aspect-square"
        >
          <img
            src={img.imageUrl}
            alt={img.prompt}
            className="w-full h-full object-cover"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
            <p className="text-white text-xs line-clamp-3">{img.prompt}</p>
            <button
              onClick={() => handleDownload(img.imageUrl, img.prompt)}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white text-xs font-medium"
            >
              <Download className="w-3 h-3" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default StatsCard;
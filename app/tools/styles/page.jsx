"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const STYLES = ["All", "Photorealistic", "Anime", "3D render", "Watercolor"];

const StylesPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeStyle, setActiveStyle] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const images = useQuery(
    api.images.getAllImages,
    isLoaded && user?.id ? { userId: user.id } : "skip"
  );

  // Filter images by selected style
  const filteredImages =
    activeStyle === "All"
      ? images
      : images?.filter((img) =>
          img.prompt.toLowerCase().includes(activeStyle.toLowerCase())
        );

  // Loading state
  if (!isLoaded || images === undefined) {
    return (
      <div className="p-6">
        <div className="h-8 w-32 bg-white/5 rounded-lg animate-pulse mb-6" />
        <div className="flex gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 w-24 bg-white/5 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
        >
          <ChevronLeft className="w-4 h-4 text-white/60" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-white">Styles</h1>
          <p className="text-white/40 text-xs mt-0.5">Browse your images by style</p>
        </div>
      </div>

      {/* Style Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {STYLES.map((style) => {
          const count =
            style === "All"
              ? images.length
              : images.filter((img) =>
                  img.prompt.toLowerCase().includes(style.toLowerCase())
                ).length;

          return (
            <button
              key={style}
              onClick={() => setActiveStyle(style)}
              className={`px-4 py-2 rounded-full text-sm transition flex items-center gap-2 ${
                activeStyle === style
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 border border-white/10 text-white/60 hover:border-purple-500"
              }`}
            >
              {style}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeStyle === style
                    ? "bg-white/20 text-white"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredImages?.length === 0 && (
        <div className="text-white/20 text-sm text-center py-24 border border-white/10 rounded-xl">
          {activeStyle === "All"
            ? "No images yet. Start generating! 🚀"
            : `No ${activeStyle} images yet. Try generating some!`}
        </div>
      )}

      {/* Image Grid */}
      {filteredImages && filteredImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img) => {

            // detect which style this image belongs to
            const detectedStyle = ["Photorealistic", "Anime", "3D render", "Watercolor"].find(
              (s) => img.prompt.toLowerCase().includes(s.toLowerCase())
            ) || "Photorealistic";

            return (
              <div
                key={img._id}
                className="group relative rounded-xl overflow-hidden border border-white/10 aspect-square cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.prompt}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Style badge */}
                <div className="absolute top-2 left-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-black/50 text-white/70 backdrop-blur-sm">
                    {detectedStyle}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                  <p className="text-white text-xs line-clamp-3">{img.prompt}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full screen modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.prompt}
              className="w-full rounded-xl"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-white/60 text-sm flex-1 line-clamp-2">
                {selectedImage.prompt}
              </p>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = selectedImage.imageUrl;
                  link.download = `${selectedImage.prompt.slice(0, 30).replace(/\s+/g, "_")}.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white text-sm shrink-0"
              >
                Download
              </button>
            </div>
            <p className="text-white/20 text-xs text-center mt-3">
              Click outside to close
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default StylesPage;
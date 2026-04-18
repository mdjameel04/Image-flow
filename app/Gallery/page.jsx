"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { ChevronLeft } from "lucide-react";
import { Download, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const GalleryPage = () => {
  const { user, isLoaded } = useUser();
  const [deletingId, setDeletingId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const images = useQuery(
    api.images.getAllImages,
    isLoaded && user?.id ? { userId: user.id } : "skip"
  );

  const deleteImage = useMutation(api.images.deleteImage);

  const handleDownload = (imageUrl, prompt) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${prompt.slice(0, 30).replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (imageId) => {
    setDeletingId(imageId);
    try {
      await deleteImage({ imageId });
    } catch (err) {
      console.error("Delete failed:", err);
    }
    setDeletingId(null);
  };

  // Loading state
  if (!isLoaded || images === undefined) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold text-white mb-6">Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">

    {/* Header */}
<div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-3">
    <button
      onClick={() => router.push("/dashboard")}
      className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
    >
      <ChevronLeft className="w-4 h-4 text-white/60" />
    </button>
    <h1 className="text-xl font-semibold text-white">Gallery</h1>
  </div>
  <p className="text-white/40 text-sm">{images.length} images</p>
</div>

      {/* Empty state */}
      {images.length === 0 && (
        <div className="text-white/20 text-sm text-center py-24 border border-white/10 rounded-xl">
          No images yet. Start generating! 🚀
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="group relative rounded-xl overflow-hidden border border-white/10 aspect-square cursor-pointer"
            >
              {/* Image */}
              <img
                src={img.imageUrl}
                alt={img.prompt}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                onClick={() => setSelectedImage(img)}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                
                {/* Prompt */}
                <p className="text-white text-xs line-clamp-3">{img.prompt}</p>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(img.imageUrl, img.prompt)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white text-xs font-medium"
                  >
                    <Download className="w-3 h-3" />
                    Save
                  </button>

                  <button
                    onClick={() => handleDelete(img._id)}
                    disabled={deletingId === img._id}
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition text-white text-xs disabled:opacity-50"
                  >
                    {deletingId === img._id ? (
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-3 h-3" />
                    )}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full screen preview modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.prompt}
              className="w-full rounded-xl"
            />

            {/* Modal bottom bar */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-white/60 text-sm flex-1 line-clamp-2">
                {selectedImage.prompt}
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleDownload(selectedImage.imageUrl, selectedImage.prompt)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-white text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedImage._id);
                    setSelectedImage(null);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 transition text-white text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>

            {/* Close hint */}
            <p className="text-white/20 text-xs text-center mt-3">
              Click outside to close
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default GalleryPage;
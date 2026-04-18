"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GeneratePage = () => {
  const { user } = useUser();
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [style, setStyle] = useState("Photorealistic");
  const [ratio, setRatio] = useState("1:1");
  const [count, setCount] = useState(4);

  const saveImage = useMutation(api.images.saveImage);
  const useCredit = useMutation(api.credit.useCredit);

  const userCredits = useQuery(
    api.user.getUserCredits,
    user?.primaryEmailAddress?.emailAddress
      ? { email: user.primaryEmailAddress.emailAddress }
      : "skip"
  );

  const isOwner = userCredits?.credits === "∞";
  const noCredits = !isOwner && userCredits?.credits === 0;

  const handleGenerate = async () => {
    if (!prompt || !user) return;

    setLoading(true);
    setError("");

    try {
      // Step 1: Generate images
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt, style, ratio, count }),
      });

      const data = await res.json();

      if (!data.images) {
        setError(
          data.error?.includes("loading")
            ? "Model is warming up, please wait 20 seconds and try again."
            : data.error || "Something went wrong. Try again."
        );
        setLoading(false);
        return;
      }

      // Step 2: Deduct credit after successful generation
      try {
        await useCredit({
          email: user.primaryEmailAddress.emailAddress,
        });
      } catch (creditErr) {
        if (creditErr.message?.includes("No credits")) {
          setError("Daily limit reached 🚫 Upgrade to continue");
          setLoading(false);
          return;
        }
      }

      // Step 3: Show images
      setImages(data.images);

      // Step 4: Save all images in parallel
      await Promise.all(
        data.images.map((img) =>
          saveImage({
            userId: user.id,
            prompt,
            imageUrl: img,
          })
        )
      );

    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <ChevronLeft className="w-4 h-4 text-white/60" />
          </button>
          <h1 className="text-xl font-semibold text-white">Generate Image</h1>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-white/40 text-sm">
            Credits:{" "}
            <span className={`font-medium ${isOwner ? "text-yellow-400" : "text-purple-400"}`}>
              {userCredits?.credits ?? "--"}
            </span>
          </p>
          <p className="text-white/40 text-sm">{images.length} images</p>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">

        {/* LEFT - IMAGE GRID */}
        <div className="flex-1 p-6 overflow-y-auto">

          {loading && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/40 text-sm">Generating your images...</p>
            </div>
          )}

          {!loading && error && (
            <div className="text-red-400 text-sm text-center mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {error}
            </div>
          )}

          {!loading && !error && images.length === 0 && (
            <div className="text-white/30 text-center mt-20 text-sm">
              No images yet. Start generating 🚀
            </div>
          )}

          {!loading && images.length > 0 && (
            <div
              className={`grid gap-4 ${
                count === 1
                  ? "grid-cols-1"
                  : count === 4
                  ? "grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Generated ${i}`}
                  className={`w-full object-cover rounded-lg border border-white/10 ${
                    count === 1 ? "h-[70vh]" : count === 4 ? "h-64" : "h-48"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT - CONTROLS */}
        <div className="w-[320px] border-l border-white/10 p-4 space-y-4 overflow-y-auto">

          {/* PROMPT */}
          <div>
            <p className="text-xs text-white/40 mb-1">PROMPT</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your image..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm resize-none focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* STYLE */}
          <div>
            <p className="text-xs text-white/40 mb-2">STYLE</p>
            <div className="grid grid-cols-2 gap-2">
              {["Photorealistic", "Anime", "3D render", "Watercolor"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`py-2 rounded-lg text-sm ${
                    style === s
                      ? "bg-purple-600 text-white"
                      : "border border-white/10 text-white/60 hover:border-purple-500"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* RATIO */}
          <div>
            <p className="text-xs text-white/40 mb-2">ASPECT RATIO</p>
            <div className="grid grid-cols-2 gap-2">
              {["1:1", "4:5", "16:9", "9:16"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRatio(r)}
                  className={`py-2 rounded-lg text-sm ${
                    ratio === r
                      ? "bg-purple-600 text-white"
                      : "border border-white/10 text-white/60 hover:border-purple-500"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* COUNT */}
          <div>
            <p className="text-xs text-white/40 mb-2">NUMBER OF IMAGES</p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 4, 8].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`py-2 rounded-lg text-sm ${
                    count === n
                      ? "bg-purple-600 text-white"
                      : "border border-white/10 text-white/60 hover:border-purple-500"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Credits warning */}
          {noCredits && (
            <div className="text-yellow-400 text-xs text-center bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2">
              No credits left. Resets in 24 hours ⏳
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt || noCredits}
            className={`w-full py-3 rounded-lg font-medium ${
              loading || !prompt || noCredits
                ? "bg-purple-600/40 text-white/40 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {loading ? "Generating..." : "Generate Images"}
          </button>

        </div>
      </div>
    </>
  );
};

export default GeneratePage;
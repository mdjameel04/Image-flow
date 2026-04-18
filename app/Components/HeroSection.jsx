"use client"

import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { Check } from "lucide-react";
import { Copy } from "lucide-react";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

const HeroSection = () => {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!idea) return;
    setLoading(true);

    try {
      const res = await fetch("/api/generate-Prompt", {  // ✅ added leading /
        method: "POST",
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();
      if (data.prompt) {
        setIdea(data.prompt);
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleCopy= async()=>{
    if(!idea) return;
    await navigator.clipboard.writeText(idea);
     setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="flex items-center justify-center text-center px-4 py-20 overflow-hidden">
      <Spotlight className="left-1/2 -translate-x-1/2 opacity-80" />
      <Spotlight className="left-1/2 -translate-x-1/2 opacity-60" />

      <div className="max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1 text-sm shadow-sm mb-6 mx-auto">
          <span className="bg-indigo-600 h-2 w-2 rounded-full animate-pulse" />
          <p className="font-medium text-purple-400 italic">
            Now With 4K Upscaling
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
          Turn your ideas{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            into Stunning
          </span>
          , <br />
          Visuals With{" "}
          <span className="font-italiano text-5xl md:text-7xl">
            ImageFlow
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-white/60 mx-auto">
          Generate breathtaking images from simple text prompts in seconds.
          Unlimited creativity, effortlessly.
        </p>

        {/* Input + Button */}
        <div className="mt-8 relative max-w-2xl mx-auto">
          <input
            value={idea}                          // ✅ controlled input
            className="p-6 pr-44 border rounded-2xl w-full border-border bg-white/5 backdrop-blur outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your ideas..."
            onChange={(e) => setIdea(e.target.value)}
          />
          <Button
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:scale-105 transition"
            onClick={handleGenerate}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {loading ? "Generating..." : "Generate"}
          </Button>
        </div>

 {/* Copy Button — only shows after a prompt is generated */}
        {idea && !loading && (
          <button
            onClick={handleCopy}
            className="mt-3 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/90 transition"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy prompt</span>
              </>
            )}
          </button>
        )}

      </div>
    </section>
  );
};

export default HeroSection;
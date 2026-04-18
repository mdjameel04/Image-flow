export const maxDuration = 60;

import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { prompt, style, ratio, count } = await req.json();

    const styleDetails = {
      "Photorealistic":
        "ultra photorealistic, sharp focus, professional photography, natural lighting, highly detailed",
      Anime:
        "anime art style, vibrant colors, detailed illustration, studio ghibli quality, cel shaded",
      "3D render":
        "3D rendered, octane render, volumetric lighting, ray tracing, ultra detailed CGI",
      Watercolor:
        "watercolor painting, soft edges, artistic brushstrokes, flowing colors, painterly style",
    };

    const styleDetail =
      styleDetails[style] || styleDetails["Photorealistic"];

    const enhancedPrompt = `${prompt}, ${styleDetail}, cinematic composition, dramatic lighting, masterpiece quality`;

    // ✅ Reduced size (important)
    const dimensions = {
      "16:9": { width: 768, height: 432 },
      "9:16": { width: 432, height: 768 },
      "4:5": { width: 640, height: 800 },
      "1:1": { width: 512, height: 512 },
    };

    const { width, height } = dimensions[ratio] || dimensions["1:1"];

    const images = [];

    for (let i = 0; i < count; i++) {
      if (i > 0) {
        await new Promise((r) => setTimeout(r, 1000));
      }

      try {
        const res = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: enhancedPrompt,
              num_steps: 3, // ✅ faster + smaller
              width,
              height,
            }),
          }
        );

        if (!res.ok) {
          const errText = await res.text();
          console.error(`CF failed for image ${i + 1}:`, errText);
          continue;
        }

        const data = await res.json();

        if (!data.result?.image) {
          console.error("No image returned:", data);
          continue;
        }

        // ✅ Upload to Cloudinary (FIXED)
        const uploadRes = await cloudinary.uploader.upload(
          `data:image/png;base64,${data.result.image}`,
          {
            folder: "ai-images",
            transformation: [
              { quality: "auto", fetch_format: "auto" },
            ],
          }
        );

        images.push(uploadRes.secure_url);

      } catch (err) {
        console.error(`Image ${i + 1} error:`, err.message);
        continue;
      }
    }

    if (images.length === 0) {
      return Response.json(
        { error: "Failed to generate images. Try again." },
        { status: 500 }
      );
    }

    return Response.json({ images, enhancedPrompt });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
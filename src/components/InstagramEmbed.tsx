import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadInstagramScript(): Promise<void> {
  if (window.instgrm) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });

  return scriptPromise;
}

interface InstagramEmbedProps {
  url: string;
  caption?: string;
}

export default function InstagramEmbed({ url, caption }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadInstagramScript().then(() => {
      if (!cancelled) window.instgrm?.Embeds.process();
    });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={containerRef} className="w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "1rem",
          margin: 0,
          maxWidth: "100%",
          minWidth: "270px",
          width: "100%",
        }}
      >
        <a href={url} target="_blank" rel="noreferrer">
          {caption ?? "Ver no Instagram"}
        </a>
      </blockquote>
    </div>
  );
}

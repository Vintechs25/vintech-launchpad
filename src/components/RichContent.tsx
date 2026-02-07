import React from "react";

/**
 * Renders rich text content with auto-detection of:
 * - YouTube URLs → embedded iframe
 * - Image URLs (.jpg, .png, .gif, .webp, .svg) → <img>
 * - Video URLs (.mp4, .webm, .ogg) → <video>
 * - Markdown images ![alt](url)
 * - **bold** text
 * - Regular paragraphs (split by double newlines)
 */

const YOUTUBE_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)(?:[&?][\w=&-]*)?/;
const IMAGE_URL_REGEX = /^https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|svg)(?:\?\S*)?$/i;
const VIDEO_URL_REGEX = /^https?:\/\/\S+\.(?:mp4|webm|ogg)(?:\?\S*)?$/i;
const MD_IMAGE_REGEX = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const VIMEO_REGEX = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;

function renderBlock(block: string, index: number): React.ReactNode {
  const trimmed = block.trim();
  if (!trimmed) return null;

  // Check for markdown image: ![alt](url)
  const mdMatch = trimmed.match(MD_IMAGE_REGEX);
  if (mdMatch) {
    return (
      <figure key={index} className="my-6">
        <img src={mdMatch[2]} alt={mdMatch[1]} className="w-full rounded-lg shadow-md" loading="lazy" />
        {mdMatch[1] && <figcaption className="text-xs text-muted-foreground mt-2 text-center">{mdMatch[1]}</figcaption>}
      </figure>
    );
  }

  // Check for standalone YouTube URL
  const ytMatch = trimmed.match(YOUTUBE_REGEX);
  if (ytMatch && trimmed.replace(YOUTUBE_REGEX, "").trim().length === 0) {
    return (
      <div key={index} className="my-6 aspect-video rounded-lg overflow-hidden shadow-md">
        <iframe
          src={`https://www.youtube.com/embed/${ytMatch[1]}`}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  // Check for standalone Vimeo URL
  const vimeoMatch = trimmed.match(VIMEO_REGEX);
  if (vimeoMatch && trimmed.replace(VIMEO_REGEX, "").trim().length === 0) {
    return (
      <div key={index} className="my-6 aspect-video rounded-lg overflow-hidden shadow-md">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoMatch[1]}`}
          title="Video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  // Check for standalone image URL
  if (IMAGE_URL_REGEX.test(trimmed)) {
    return (
      <figure key={index} className="my-6">
        <img src={trimmed} alt="" className="w-full rounded-lg shadow-md" loading="lazy" />
      </figure>
    );
  }

  // Check for standalone video URL
  if (VIDEO_URL_REGEX.test(trimmed)) {
    return (
      <div key={index} className="my-6">
        <video src={trimmed} controls className="w-full rounded-lg shadow-md" />
      </div>
    );
  }

  // Regular paragraph with bold markdown support
  return (
    <p
      key={index}
      className="text-muted-foreground leading-relaxed mb-6 text-base whitespace-pre-line"
      dangerouslySetInnerHTML={{
        __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>'),
      }}
    />
  );
}

interface RichContentProps {
  content: string;
  className?: string;
}

const RichContent = ({ content, className = "" }: RichContentProps) => {
  const blocks = content.split(/\n\n+/);

  return (
    <div className={className}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
};

export default RichContent;

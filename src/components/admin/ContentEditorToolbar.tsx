import { useRef } from "react";
import { Image, Video, Youtube } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContentEditorToolbarProps {
  onInsert: (text: string) => void;
}

const ContentEditorToolbar = ({ onInsert }: ContentEditorToolbarProps) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    const ext = file.name.split(".").pop();
    const path = `content/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) {
      console.error("Upload error:", error);
      return;
    }
    const { data } = supabase.storage.from("images").getPublicUrl(path);
    onInsert(`\n\n${data.publicUrl}\n\n`);
  };

  const insertYoutube = () => {
    const url = prompt("Paste YouTube URL:");
    if (url?.trim()) onInsert(`\n\n${url.trim()}\n\n`);
  };

  const insertVideo = () => {
    const url = prompt("Paste video URL (.mp4, .webm):");
    if (url?.trim()) onInsert(`\n\n${url.trim()}\n\n`);
  };

  return (
    <div className="flex items-center gap-1 mb-1">
      <span className="text-xs text-muted-foreground mr-2">Insert:</span>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-border text-muted-foreground hover:text-foreground hover:border-ring transition-colors"
        title="Upload image"
      >
        <Image size={14} /> Image
      </button>
      <button
        type="button"
        onClick={insertYoutube}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-border text-muted-foreground hover:text-foreground hover:border-ring transition-colors"
        title="Embed YouTube video"
      >
        <Youtube size={14} /> YouTube
      </button>
      <button
        type="button"
        onClick={insertVideo}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded border border-border text-muted-foreground hover:text-foreground hover:border-ring transition-colors"
        title="Embed video URL"
      >
        <Video size={14} /> Video
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadImage(file);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default ContentEditorToolbar;

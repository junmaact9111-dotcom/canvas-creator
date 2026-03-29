import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ImageUploadArea from "./ImageUploadArea";
import FrameUploadArea from "./FrameUploadArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";

const AgentDialog = () => {
  const [prompt, setPrompt] = useState("");
  const [genMethod, setGenMethod] = useState("generate");
  const [ratio, setRatio] = useState("1:1");
  const [videoMode, setVideoMode] = useState("smart");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [mentionOpen, setMentionOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isVideo = genMethod === "video";
  const isFrameMode = isVideo && videoMode === "frame";
  const hasMultipleImages = uploadedImages.length >= 2;

  const placeholder = isFrameMode
    ? "请描述你想创作的画面内容、运动方式等。例如：一个小女孩，在公园骑单车"
    : hasMultipleImages
      ? "@参考内容，描述你想如何调整图片"
      : "上传参考图、输入文字，描述你想要生成的图片";

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);

    // Check if user just typed @
    const cursorPos = e.target.selectionStart;
    if (value[cursorPos - 1] === "@" && hasMultipleImages) {
      setMentionOpen(true);
    } else if (mentionOpen && !value.includes("@")) {
      setMentionOpen(false);
    }
  };

  const handleMentionSelect = (index: number) => {
    const name = `图片${index + 1}`;
    // Replace the last @ with @图片N
    const lastAtIndex = prompt.lastIndexOf("@");
    if (lastAtIndex !== -1) {
      const newPrompt = prompt.slice(0, lastAtIndex) + `@${name} ` + prompt.slice(lastAtIndex + 1);
      setPrompt(newPrompt);
    }
    setMentionOpen(false);
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    console.log("Submit:", { prompt, genMethod, ratio, videoMode });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        {/* Main input area */}
        <div className="flex items-start gap-3 p-4 pb-2">
          {isFrameMode ? (
            <FrameUploadArea />
          ) : (
            <ImageUploadArea onImagesChange={setUploadedImages} />
          )}
          <div className="flex-1 relative">
            <Popover open={mentionOpen} onOpenChange={setMentionOpen}>
              <PopoverAnchor asChild>
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={handlePromptChange}
                  placeholder={placeholder}
                  className="w-full min-h-[80px] max-h-40 resize-none bg-transparent text-foreground placeholder:text-muted-foreground text-sm leading-relaxed focus:outline-none pt-1"
                  rows={3}
                />
              </PopoverAnchor>
              <PopoverContent
                className="w-56 p-1"
                side="bottom"
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
              >
                {uploadedImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => handleMentionSelect(i)}
                    className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
                  >
                    <img
                      src={src}
                      alt={`图片${i + 1}`}
                      className="w-8 h-8 rounded object-cover flex-shrink-0 border border-border"
                    />
                    <span>图片{i + 1}</span>
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-config">
          <div className="flex items-center gap-2">
            <Select value={genMethod} onValueChange={(v) => { setGenMethod(v); if (v !== "video") setVideoMode("smart"); }}>
              <SelectTrigger className="h-8 w-auto gap-1 border-none bg-card shadow-sm text-xs font-medium px-3 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="generate">图片生成</SelectItem>
                <SelectItem value="video">视频生成</SelectItem>
                <SelectItem value="gif">GIF生成</SelectItem>
              </SelectContent>
            </Select>

            <Select value={ratio} onValueChange={setRatio}>
              <SelectTrigger className="h-8 w-auto gap-1 border-none bg-card shadow-sm text-xs font-medium px-3 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="3:2">3:2</SelectItem>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="20:3">20:3</SelectItem>
                <SelectItem value="9:16">9:16</SelectItem>
                <SelectItem value="9:20">9:20</SelectItem>
              </SelectContent>
            </Select>

            {isVideo && (
              <Select value={videoMode} onValueChange={setVideoMode}>
                <SelectTrigger className="h-8 w-auto gap-1 border-none bg-card shadow-sm text-xs font-medium px-3 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smart">智能参考</SelectItem>
                  <SelectItem value="frame">首尾帧</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentDialog;

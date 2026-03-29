import { useState } from "react";
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

const AgentDialog = () => {
  const [prompt, setPrompt] = useState("");
  const [genMethod, setGenMethod] = useState("generate");
  const [ratio, setRatio] = useState("1:1");
  const [videoMode, setVideoMode] = useState("smart");

  const isVideo = genMethod === "video";
  const isFrameMode = isVideo && videoMode === "frame";

  const placeholder = isFrameMode
    ? "请描述你想创作的画面内容、运动方式等。例如：一个小女孩，在公园骑单车"
    : "上传参考图、输入文字，描述你想要生成的图片";

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    console.log("Submit:", { prompt, genMethod, ratio, videoMode });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        {/* Main input area */}
        <div className="flex items-start gap-3 p-4 pb-2">
          {isFrameMode ? <FrameUploadArea /> : <ImageUploadArea />}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="flex-1 min-h-[80px] max-h-40 resize-none bg-transparent text-foreground placeholder:text-muted-foreground text-sm leading-relaxed focus:outline-none pt-1"
            rows={3}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-config">
          <div className="flex items-center gap-2">
            {/* Generation method */}
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

            {/* Ratio */}
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

            {/* Video mode - only when video is selected */}
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

          {/* Submit button */}
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

import { useState } from "react";
import { Send, ChevronDown } from "lucide-react";
import ImageUploadArea from "./ImageUploadArea";
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

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    console.log("Submit:", { prompt, genMethod, ratio });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
        {/* Main input area */}
        <div className="flex items-start gap-3 p-4 pb-2">
          <ImageUploadArea />
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="上传参考图、输入文字，描述你想要生成的图片"
            className="flex-1 min-h-[80px] max-h-40 resize-none bg-transparent text-foreground placeholder:text-muted-foreground text-sm leading-relaxed focus:outline-none pt-1"
            rows={3}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-config">
          <div className="flex items-center gap-2">
            {/* Generation method */}
            <Select value={genMethod} onValueChange={setGenMethod}>
              <SelectTrigger className="h-8 w-auto gap-1 border-none bg-card shadow-sm text-xs font-medium px-3 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="generate">图片生成</SelectItem>
                <SelectItem value="edit">图片编辑</SelectItem>
                <SelectItem value="variation">图片变体</SelectItem>
              </SelectContent>
            </Select>

            {/* Ratio */}
            <Select value={ratio} onValueChange={setRatio}>
              <SelectTrigger className="h-8 w-auto gap-1 border-none bg-card shadow-sm text-xs font-medium px-3 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="4:3">4:3</SelectItem>
                <SelectItem value="3:4">3:4</SelectItem>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="9:16">9:16</SelectItem>
              </SelectContent>
            </Select>
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

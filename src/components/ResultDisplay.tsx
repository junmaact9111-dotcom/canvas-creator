import { useState } from "react";
import { Copy, Plus, RotateCcw, Pencil, Download, Expand, Video, Eraser, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ResultDisplayProps {
  resultImage: string;
  referenceImage: string;
  promptText: string;
  ratio: string;
  onInjectImage: (src: string) => void;
  onCopyPrompt: (text: string) => void;
  onReEdit: () => void;
  onRegenerate: () => void;
}

const ResultDisplay = ({
  resultImage,
  referenceImage,
  promptText,
  ratio,
  onInjectImage,
  onCopyPrompt,
  onReEdit,
  onRegenerate,
}: ResultDisplayProps) => {
  const [promptHovered, setPromptHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const toolbarItems = [
    { icon: Download, label: "下载", onClick: () => console.log("下载") },
    { icon: Expand, label: "扩图", onClick: () => console.log("扩图") },
    { icon: Video, label: "视频", onClick: () => console.log("视频") },
    { icon: Eraser, label: "消除笔", onClick: () => console.log("消除笔") },
  ];

  const moreMenuItems = [
    "同步至素材管理后台",
    "广告暗投",
    "同步至客户素材管理后台",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Top bar: reference image + prompt + ratio */}
      <div className="flex items-center gap-3 mb-3 px-1">
        <div
          className="w-10 h-10 rounded-lg overflow-hidden border border-border flex-shrink-0 cursor-pointer group relative"
          onClick={() => onInjectImage(referenceImage)}
          title="添加到参考图"
        >
          <img src={referenceImage} alt="参考图" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        <div
          className="flex-1 min-w-0 relative"
          onMouseEnter={() => setPromptHovered(true)}
          onMouseLeave={() => setPromptHovered(false)}
        >
          <p className="text-sm text-foreground truncate pr-20">{promptText}</p>
          {promptHovered && (
            <button
              onClick={() => onCopyPrompt(promptText)}
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              <Copy className="w-3 h-3" />
              复制提示词
            </button>
          )}
        </div>

        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md flex-shrink-0">
          {ratio}
        </span>
      </div>

      {/* Result image with hover toolbar */}
      <div
        className="rounded-xl overflow-hidden border border-border bg-card shadow-sm relative"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <img src={resultImage} alt="生成结果" className="w-full object-contain max-h-[400px]" />

        {/* Hover toolbar */}
        <div
          className={`absolute bottom-3 right-3 flex items-center gap-1 bg-popover/95 backdrop-blur-sm border border-border rounded-lg px-1.5 py-1 shadow-lg transition-all duration-200 ${
            imageHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          {toolbarItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              title={item.label}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-md hover:bg-accent transition-colors"
            >
              <item.icon className="w-4 h-4 text-foreground" />
              <span className="text-[10px] text-muted-foreground leading-none">{item.label}</span>
            </button>
          ))}

          {/* More dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-md hover:bg-accent transition-colors">
                <MoreHorizontal className="w-4 h-4 text-foreground" />
                <span className="text-[10px] text-muted-foreground leading-none">更多</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
              {moreMenuItems.map((item) => (
                <DropdownMenuItem key={item} onClick={() => console.log(item)}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 mt-3 px-1">
        <button
          onClick={onReEdit}
          className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-border bg-card text-foreground hover:bg-secondary transition-colors"
        >
          <Pencil className="w-3.5 h-3.5" />
          重新编辑
        </button>
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg border border-border bg-card text-foreground hover:bg-secondary transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          重新生成
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;

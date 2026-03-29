import { useState } from "react";
import { Copy, Plus, RotateCcw, Pencil } from "lucide-react";

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

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Top bar: reference image + prompt + ratio */}
      <div className="flex items-center gap-3 mb-3 px-1">
        {/* Reference thumbnail */}
        <div
          className="w-10 h-10 rounded-lg overflow-hidden border border-border flex-shrink-0 cursor-pointer group relative"
          onClick={() => onInjectImage(referenceImage)}
          title="添加到参考图"
        >
          <img
            src={referenceImage}
            alt="参考图"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22><text y=%2218%22 font-size=%2218%22>➕</text></svg>'),_pointer]">
            <Plus className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        {/* Prompt text */}
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

        {/* Ratio badge */}
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md flex-shrink-0">
          {ratio}
        </span>
      </div>

      {/* Result image */}
      <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm">
        <img
          src={resultImage}
          alt="生成结果"
          className="w-full object-contain max-h-[400px]"
        />
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

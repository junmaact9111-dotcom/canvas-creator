import { useState, useRef } from "react";
import { ImagePlus, Upload, FolderOpen, ArrowLeftRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FrameUploadArea = () => {
  const [firstFrame, setFirstFrame] = useState<string | null>(null);
  const [lastFrame, setLastFrame] = useState<string | null>(null);
  const [activeFrame, setActiveFrame] = useState<"first" | "last">("first");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (activeFrame === "first") setFirstFrame(result);
      else setLastFrame(result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleLocalUpload = (frame: "first" | "last") => {
    setActiveFrame(frame);
    setPopoverOpen(false);
    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const handleAdLibrary = () => {
    setPopoverOpen(false);
  };

  const swapFrames = () => {
    setFirstFrame((prev) => {
      setLastFrame(firstFrame);
      return lastFrame;
    });
  };

  const FrameBox = ({
    label,
    image,
    frame,
  }: {
    label: string;
    image: string | null;
    frame: "first" | "last";
  }) => (
    <Popover
      open={popoverOpen && activeFrame === frame}
      onOpenChange={(open) => {
        setActiveFrame(frame);
        setPopoverOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <button className="w-20 h-20 rounded-xl border-2 border-dashed border-upload-border bg-upload hover:bg-upload-hover transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer group overflow-hidden">
          {image ? (
            <img src={image} alt={label} className="w-full h-full object-cover" />
          ) : (
            <>
              <ImagePlus className="w-5 h-5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1" side="top" align="start">
        <button
          onClick={() => handleLocalUpload(frame)}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
        >
          <Upload className="w-4 h-4" />
          本地上传
        </button>
        <button
          onClick={handleAdLibrary}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
        >
          <FolderOpen className="w-4 h-4" />
          广告素材库
        </button>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="flex-shrink-0">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex items-center gap-1.5">
        <FrameBox label="首帧" image={firstFrame} frame="first" />
        <button
          onClick={swapFrames}
          className="w-6 h-6 rounded-full bg-muted hover:bg-muted-foreground/20 flex items-center justify-center transition-colors"
          title="调换首尾帧"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <FrameBox label="尾帧" image={lastFrame} frame="last" />
      </div>
    </div>
  );
};

export default FrameUploadArea;

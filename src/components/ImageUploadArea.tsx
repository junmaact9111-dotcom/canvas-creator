import { useState, useRef } from "react";
import { ImagePlus, Upload, FolderOpen } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ImageUploadArea = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLocalUpload = () => {
    setPopoverOpen(false);
    fileInputRef.current?.click();
  };

  const handleAdLibrary = () => {
    setPopoverOpen(false);
    // TODO: open ad library modal
  };

  return (
    <div className="flex-shrink-0">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            className="w-20 h-20 rounded-xl border-2 border-dashed border-upload-border bg-upload hover:bg-upload-hover transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer group overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="预览" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <>
                <ImagePlus className="w-6 h-6 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] text-muted-foreground">添加图片</span>
              </>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-48 p-1" side="top" align="start">
          <button
            onClick={handleLocalUpload}
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
    </div>
  );
};

export default ImageUploadArea;

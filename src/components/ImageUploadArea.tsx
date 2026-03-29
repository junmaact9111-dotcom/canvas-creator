import { useState, useRef } from "react";
import { ImagePlus, Upload, FolderOpen, Plus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ImageUploadAreaProps {
  onImagesChange?: (images: string[]) => void;
}

const ImageUploadArea = ({ onImagesChange }: ImageUploadAreaProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setImages((prev) => {
          const next = [...prev, reader.result as string];
          onImagesChange?.(next);
          return next;
        });
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleLocalUpload = () => {
    setPopoverOpen(false);
    fileInputRef.current?.click();
  };

  const handleAdLibrary = () => {
    setPopoverOpen(false);
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      onImagesChange?.(next);
      return next;
    });
  };

  const hasImages = images.length > 0;

  return (
    <div
      className="flex-shrink-0 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {hasImages ? (
        <div className="flex items-center">
          {/* Stacked / expanded images */}
          <div
            className={`flex items-center transition-all duration-300 ease-in-out ${
              isHovered ? "gap-2" : ""
            }`}
          >
            {images.map((src, i) => (
              <div
                key={i}
                className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 border-card shadow-sm flex-shrink-0 transition-all duration-300 ease-in-out group/img ${
                  !isHovered && i > 0 ? "-ml-6" : ""
                }`}
                style={{ zIndex: images.length - i }}
              >
                <img
                  src={src}
                  alt={`上传图片 ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                {isHovered && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(i);
                    }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add more button */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                className={`w-14 h-14 rounded-lg border-2 border-dashed border-upload-border bg-upload hover:bg-upload-hover transition-all duration-300 flex items-center justify-center cursor-pointer flex-shrink-0 ${
                  isHovered ? "ml-2" : "-ml-4"
                }`}
                style={{ zIndex: 0 }}
              >
                <Plus className="w-5 h-5 text-primary opacity-60" />
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
      ) : (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button className="w-20 h-20 rounded-xl border-2 border-dashed border-upload-border bg-upload hover:bg-upload-hover transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer group overflow-hidden">
              <ImagePlus className="w-6 h-6 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] text-muted-foreground">添加图片</span>
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
      )}
    </div>
  );
};

export default ImageUploadArea;

import React, { useRef } from "react";
import { UploadCloud, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadCardProps {
  label: string;
  description?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  actionButton?: React.ReactNode;
  isOriginal?: boolean;
}

export function UploadCard({
  label,
  description,
  file,
  onFileChange,
  actionButton,
  isOriginal = false,
}: UploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!file && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-medium text-gray-200">{label}</h3>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
      </div>

      <div
        onClick={handleClick}
        className={cn(
          "flex-1 relative rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden flex flex-col items-center justify-center p-6 min-h-[200px] group cursor-pointer",
          file
            ? isOriginal
              ? "border-primary/50 bg-primary/5"
              : "border-primary/30 bg-primary/5"
            : "border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10"
        )}
      >
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          accept="image/*,video/*"
        />

        {!file ? (
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-gray-300 font-medium mb-1">Click or drag file to upload</p>
            <p className="text-xs text-gray-500">Supports JPG, PNG, MP4</p>
          </div>
        ) : (
          <div className="w-full h-full relative flex items-center justify-center">
            {/* Image Preview with hover zoom */}
            <div className="w-full h-full relative overflow-hidden rounded-lg group/img">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover max-h-[200px] transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={handleClear}
                  className="bg-red-500/80 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-md transition-colors"
                  title="Remove file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {file && actionButton && <div className="mt-4">{actionButton}</div>}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Upload, FileText, ImagePlus, Loader2, X, Image as LucideImage } from "lucide-react";

export default function ImageUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Live image preview logic
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image first");
    if (!title) return toast.error("Please provide a title");

    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      await api.post("/images", formData);
      toast.success("Asset added to gallery");
      
      // Preserve original logic for list consistency
      window.location.reload();
    } catch (err) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white border border-zinc-200 p-10 md:p-14 rounded-[1.5rem] shadow-sm mb-16">
      {/* --- Section Header --- */}
      <div className="flex items-center justify-between mb-14">
        <div className="flex items-center gap-6">
          <div className="text-zinc-900 border border-zinc-200 p-3.5 rounded-xl">
            <ImagePlus size={22} strokeWidth={1.2} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              Studio Archive <span className="text-zinc-300 font-light mx-1">/</span> New Entry
            </h2>
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest mt-1">
              Asset Deployment Interface
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* --- Input Controls --- */}
        <div className="flex flex-col justify-center space-y-12">
          {/* Title Field */}
          <div className="space-y-4">
            <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em] ml-0.5 flex items-center gap-2">
              <FileText size={12} strokeWidth={2} /> Asset Title
            </label>
            <input
              type="text"
              placeholder="Enter asset title..."
              className="w-full px-0 py-3 bg-transparent border-b border-zinc-200 focus:border-zinc-900 outline-none transition-all text-base font-medium text-zinc-900 placeholder:text-zinc-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* File Picker */}
          <div className="space-y-4">
            <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-[0.2em] ml-0.5 flex items-center gap-2">
              <Upload size={12} strokeWidth={2} /> Media Source
            </label>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept="image/*"
              />
              <label
                htmlFor="file-upload"
                className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border transition-all cursor-pointer ${
                  file 
                  ? "border-zinc-900 bg-zinc-50 text-zinc-900" 
                  : "border-zinc-200 bg-white text-zinc-400 hover:border-zinc-400"
                }`}
              >
                <span className="truncate text-sm font-medium pr-4">
                  {file ? file.name : "Select file from local directory..."}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-900 px-5 py-2.5 bg-white border border-zinc-200 rounded-lg shadow-sm hover:bg-zinc-50">
                  Browse
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* --- Media Preview Window --- */}
        <div className="relative">
          <div className={`aspect-square rounded-2xl border border-zinc-100 overflow-hidden flex items-center justify-center transition-all duration-700 ${!preview ? 'bg-zinc-50' : 'bg-white shadow-2xl shadow-zinc-200/50'}`}>
            {preview ? (
              <div className="relative w-full h-full">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover animate-in fade-in duration-1000" 
                />
                <button 
                  onClick={() => setFile(null)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-zinc-900 p-2 rounded-full hover:bg-white transition-all shadow-sm border border-zinc-100"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <LucideImage size={32} className="mx-auto text-zinc-200" strokeWidth={1} />
                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-zinc-300">
                  Waiting for media
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- Action Bar --- */}
      <div className="mt-20 flex items-center justify-between pt-10 border-t border-zinc-100">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-semibold text-zinc-900 uppercase tracking-widest">
            Standard Format
          </p>
          <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-[0.1em]">
            Ratio: Square (1:1) / Optimized
          </p>
        </div>
        
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white px-16 py-4 rounded-xl font-medium text-[11px] uppercase tracking-[0.2em] transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg shadow-zinc-200"
        >
          {isUploading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload size={14} strokeWidth={2.5} />
              Publish Asset
            </>
          )}
        </button>
      </div>
    </div>
  );
}
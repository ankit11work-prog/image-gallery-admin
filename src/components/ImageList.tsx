"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { 
  Edit2, 
  Trash2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Hash,
  Loader2
} from "lucide-react";

type Image = {
  _id: string;
  imageUrl: string;
  title: string;
  createdAt?: string;
};

export default function ImageList() {
  // ✅ ONLY THESE STATES REMAIN
  const [images, setImages] = useState<Image[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [page]); // Removed search from dependency

  const fetchImages = async () => {
    setLoading(true);
    try {
      // Search parameter is now hardcoded to empty as per your request to remove state
      const res = await api.get(`/images?search=&page=${page}&limit=6`);
      setImages(res.data);
    } catch {
      toast.error("Archive sync failed");
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Confirm asset removal from Archive?")) return;
    try {
      await api.delete(`/images/${id}`);
      toast.success("Asset Purged");
      fetchImages();
    } catch {
      toast.error("Deletion Failed");
    }
  };

  const startEditing = (img: Image) => {
    setEditingId(img._id);
    setNewTitle(img.title);
  };

  const saveEdit = async (id: string) => {
    try {
      await api.put(`/images/${id}`, { title: newTitle });
      toast.success("Archive Updated");
      setEditingId(null);
      fetchImages();
    } catch {
      toast.error("Update Failed");
    }
  };

  return (
    <div className="w-full antialiased text-zinc-900">

      {/* --- Studio Grid --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4 transition-all animate-pulse">
          <Loader2 className="animate-spin text-zinc-200" size={32} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">
            Syncing Library...
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {images.map((img) => (
            <div 
              key={img._id} 
              className="group relative bg-white border border-zinc-100/50 rounded-[2.5rem] p-7 transition-all duration-700 ease-in-out hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2"
            >
              {/* Asset Preview */}
              <div className="relative aspect-square mb-8 rounded-[2rem] overflow-hidden bg-zinc-50 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                <img 
                  src={img.imageUrl} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                  alt={img.title}
                />
                <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-white/90 backdrop-blur-xl p-3 rounded-2xl border border-white shadow-xl">
                    <Hash size={14} className="text-zinc-900" />
                  </div>
                </div>
              </div>

              {/* Metadata Area */}
              <div className="px-1">
                {editingId === img._id ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative">
                      <input 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-zinc-950 py-3 text-sm font-black outline-none uppercase tracking-tighter"
                        autoFocus
                      />
                      <span className="absolute -top-4 left-0 text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                        Rename Asset
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => saveEdit(img._id)}
                        className="flex-1 bg-zinc-950 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black shadow-lg shadow-zinc-200 active:scale-95 transition-all"
                      >
                        Commit Changes
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="p-4 bg-zinc-50 text-zinc-400 rounded-2xl hover:text-zinc-950 hover:bg-zinc-100 transition-all active:scale-95"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-10 transition-all">
                    <div className="space-y-2">
                      <h3 className="text-base font-black text-zinc-950 uppercase tracking-tighter truncate leading-none">
                        {img.title}
                      </h3>
                      <p className="text-[9px] font-bold text-zinc-300 uppercase tracking-[0.4em]">
                        Reference_{img._id.slice(-6).toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-zinc-50">
                      <button 
                        onClick={() => startEditing(img)}
                        className="text-[10px] font-black text-zinc-400 hover:text-zinc-950 transition-all duration-300 uppercase tracking-[0.2em] flex items-center gap-2 group/btn"
                      >
                        <Edit2 size={14} className="group-hover/btn:rotate-12 transition-transform" /> 
                        Modify
                      </button>
                      <button 
                        onClick={() => handleDelete(img._id)}
                        className="text-[10px] font-black text-zinc-400 hover:text-red-500 transition-all duration-300 uppercase tracking-[0.2em] flex items-center gap-2 group/btn"
                      >
                        <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" /> 
                        Purge
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Pagination --- */}
      <div className="flex justify-center items-center gap-16 mt-24 py-12 border-t border-zinc-100">
        <button 
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="p-4 bg-white border border-zinc-100 rounded-full text-zinc-300 hover:text-zinc-950 hover:shadow-xl hover:-translate-x-1 disabled:opacity-5 transition-all duration-500"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.5em] mb-2">
            Index_Sequence
          </span>
          <div className="bg-zinc-950 text-white w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-xl shadow-zinc-200">
            {page}
          </div>
        </div>

        <button 
          onClick={() => setPage((p) => p + 1)}
          disabled={images.length < 6}
          className="p-4 bg-white border border-zinc-100 rounded-full text-zinc-300 hover:text-zinc-950 hover:shadow-xl hover:translate-x-1 disabled:opacity-5 transition-all duration-500"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
"use client";

import ImageUpload from "../components/ImageUpload";
import ImageList from "../components/ImageList";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Settings2,
  Database,
  Search,
  Plus,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans antialiased relative">
      <div className="fixed left-0 top-0 bottom-0 w-[6px] bg-zinc-950 z-[60]" />

      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-zinc-200/50 px-12 h-24 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 rounded-full border-[2.5px] border-[#f97316] flex items-center justify-center">
                <Plus size={16} className="text-[#f97316]" strokeWidth={3} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#f97316] rounded-full border-2 border-white animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-950">
                Ingestion Point
              </span>
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                Studio Archive System
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 border-l border-zinc-200 pl-12">
            <div className="flex items-center gap-3">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </div>

              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Nodes: <span className="text-zinc-900">Live_01</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Database size={13} className="text-zinc-400" />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Storage: <span className="text-zinc-900">Optimized</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button className="p-2 text-zinc-400 hover:text-zinc-950">
            <Settings2 size={20} />
          </button>

          <button
            onClick={logout}
            className="group flex items-center gap-3 px-8 py-3 bg-zinc-950 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <LogOut size={12} className="group-hover:-translate-x-1" />
            Terminate Session
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-12 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-20 items-start">
          <section className="xl:col-span-5">
            <div className="sticky top-40">
              <div className="mb-10 px-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#f97316]">
                  Module_01
                </span>
                <h3 className="text-3xl font-black tracking-tighter mt-2">
                  New Ingestion
                </h3>
              </div>

              <ImageUpload />
            </div>
          </section>

          <section className="xl:col-span-7">
            <div className="flex flex-col gap-12">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-10">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.4em]">
                    Stored Archive <span className="text-zinc-300 mx-2">/</span>{" "}
                    Library
                  </h2>

                  <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.1em] mt-3">
                    Authorized access to encrypted asset directory
                  </p>
                </div>

                <div className="relative group w-72">
                  <Search
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-300"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search Archive Index"
                    className="w-full bg-transparent border-b border-zinc-200 focus:border-zinc-950 pl-7 py-3 outline-none text-[11px] font-bold tracking-widest uppercase"
                  />
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-zinc-100">
                <ImageList />
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-32 border-t border-zinc-100 py-12 bg-white/50">
        <div className="max-w-[1600px] mx-auto px-12 flex justify-between items-center">
          <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.5em]">
            © 2026 Admin Network
          </span>

          <button className="text-[10px] font-black text-zinc-400 hover:text-zinc-950 uppercase tracking-widest flex items-center gap-2">
            System Docs <ArrowUpRight size={12} />
          </button>
        </div>
      </footer>
    </div>
  );
}
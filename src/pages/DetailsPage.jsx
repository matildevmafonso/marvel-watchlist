import React from "react";
import { Button } from "../components/ui/button";
import { ChevronLeft, Calendar, Users, Info, Shield, Layers } from "lucide-react";

const DetailsPage = ({ movie, onBack }) => {
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-[#e62429] text-white font-sans selection:bg-white selection:text-red-600 animate-in fade-in duration-500">
      <div className="sticky top-0 p-4 bg-[#e62429]/90 backdrop-blur-md z-30 border-b border-white/10 flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={onBack}
        >
          <ChevronLeft className="mr-2" /> Back to Dashboard
        </Button>
        <span className="font-black italic uppercase tracking-tighter opacity-50">
          Intel Briefing
        </span>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="block">
          <div className="float-left mr-8 mb-4 w-40 md:w-56 shadow-2xl rounded-2xl overflow-hidden border-4 border-white/20">
            <img
              src={movie.cover_url}
              alt={movie.title}
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-6">
            <header>
              <div className="flex items-center gap-3 text-white/60 mb-2">
                <Calendar size={18} className="text-white" />
                <span className="font-bold tracking-widest uppercase italic text-sm">
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.9] mb-4">
                {movie.title}
              </h1>
            </header>

            <section className="space-y-4">
              <div className="flex items-center gap-2 border-l-4 border-white pl-4 py-1">
                <Info size={20} />
                <h3 className="text-xl font-black uppercase italic tracking-tighter">
                  Synopsis
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-white/90 font-medium italic">
                {movie.overview ||
                  "No transmission data available for this operation."}
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 clear-both md:clear-none">
              <section className="space-y-4">
                <div className="flex items-center gap-2 border-l-4 border-white pl-4 py-1">
                  <Users size={20} />
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">
                    Personnel
                  </h3>
                </div>
                <div className="bg-black/20 p-4 rounded-xl space-y-4 border border-white/5">
                  <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
                      Director
                    </p>
                    <p className="text-lg font-bold italic uppercase">
                      {movie.directed_by || "Classified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">
                      Cast Members
                    </p>
                    <p className="text-sm font-bold italic uppercase opacity-60">
                      Refer to Avengers Initiative Database (Access Restricted)
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 border-l-4 border-white pl-4 py-1">
                  <Shield size={20} />
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">
                    Classification
                  </h3>
                </div>
                <div className="bg-black/20 p-4 rounded-xl space-y-4 border border-white/5">
                  <div className="flex items-center gap-4">
                    <Layers size={16} className="text-red-400" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                        Phase
                      </p>
                      <p className="text-lg font-bold italic uppercase tracking-tighter">
                        {movie.phase || "?"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Shield size={16} className="text-red-400" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em]">
                        Saga
                      </p>
                      <p className="text-lg font-bold italic uppercase tracking-tighter">
                        {movie.saga || "Multiverse"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

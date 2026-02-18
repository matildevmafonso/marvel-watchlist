import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  Users,
  Info,
  Shield,
  Layers,
} from "lucide-react";

const IndexPage = ({ onNext }) => (
  <div className="flex flex-col items-center justify-between h-screen bg-[#e62429] text-white overflow-hidden relative font-sans py-6 px-4">
    {/* Top Section: Logo - Scaled down for the 550px width */}
    <div className="animate-fade-in z-10 w-full flex justify-center">
      <img
        src="/assets/logo.png"
        alt="Logo"
        className="w-[380px] max-w-full rounded-lg shadow-xl border-2 border-white/10"
      />
    </div>

    {/* Middle Section: Spider-Man */}
    <div className="flex-1 flex items-start justify-center relative w-full -mt-25">
      <div className="animate-fade-in z-0 transform transition-transform hover:scale-105 duration-700">
        <img
          src="/assets/spiderman.png"
          alt="Spider-Man"
          className="w-[240px] animate-swing origin-top"
        />
      </div>
    </div>

    {/* Bottom Section: Button - Tighter spacing */}
    <div className="animate-fade-in z-10 flex flex-col items-center gap-2 mt-2">
      <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse italic">
        Initiative Entry
      </p>
      <Button
        variant="secondary"
        className="h-14 px-8 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 bg-[#b11313] border-none group active:scale-95"
        onClick={onNext}
      >
        <img
          src="/assets/infinitystones.png"
          alt="Infinity Stones"
          className="h-7 mx-2 group-hover:rotate-12 transition-transform duration-500"
        />
      </Button>
    </div>
  </div>
);

const DashboardPage = ({ onBack, onSelectMovie }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mcuapi.up.railway.app/api/v1/movies")
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.data.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date),
        );
        setMovies(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const nextMovie = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevMovie = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#e62429] text-white font-sans">
        <Loader2 className="h-16 w-16 animate-spin mb-4" />
        <h2 className="text-2xl font-bold uppercase italic tracking-widest animate-pulse">
          Assembling Data...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#e62429] text-white p-4 relative overflow-hidden font-sans">
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20"
          onClick={onBack}
        >
          <ChevronLeft className="mr-2" /> Back
        </Button>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-2xl animate-in fade-in zoom-in duration-500">
        <div className="relative group flex items-center justify-center w-full">
          <Button
            variant="ghost"
            className="absolute left-0 z-10 h-full px-2 hover:bg-black/20 text-white rounded-none transition-colors"
            onClick={prevMovie}
          >
            <ChevronLeft size={64} />
          </Button>

          <button
            className="relative w-72 h-[450px] shadow-2xl rounded-xl overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 transform hover:scale-105 bg-black/20 cursor-pointer"
            onClick={() => onSelectMovie(movies[currentIndex])}
          >
            <img
              key={movies[currentIndex]?.id}
              src={movies[currentIndex]?.cover_url}
              alt={movies[currentIndex]?.title}
              className="w-full h-full object-cover animate-in fade-in slide-in-from-right-8 duration-500"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x750?text=Marvel+Poster";
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 text-left">
              <p className="text-sm font-bold text-red-500 uppercase tracking-widest mb-1">
                {new Date(movies[currentIndex]?.release_date).getFullYear()}
              </p>
              <h2 className="text-2xl font-black leading-tight uppercase italic drop-shadow-xl tracking-tighter">
                {movies[currentIndex]?.title}
              </h2>
              <p className="text-[10px] text-white/40 uppercase mt-2 tracking-[0.2em] font-bold">
                Click for details
              </p>
            </div>
          </button>

          <Button
            variant="ghost"
            className="absolute right-0 z-10 h-full px-2 hover:bg-black/20 text-white rounded-none transition-colors"
            onClick={nextMovie}
          >
            <ChevronRight size={64} />
          </Button>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-white font-bold tracking-widest uppercase italic">
            Movie {currentIndex + 1} of {movies.length}
          </p>
          <div className="w-48 h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / movies.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

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

function App() {
  const [page, setPage] = useState("index");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setPage("details");
  };

  return (
    <div className="min-h-screen font-sans antialiased">
      {page === "index" && <IndexPage onNext={() => setPage("dashboard")} />}
      {page === "dashboard" && (
        <DashboardPage
          onBack={() => setPage("index")}
          onSelectMovie={handleMovieSelect}
        />
      )}
      {page === "details" && (
        <DetailsPage
          movie={selectedMovie}
          onBack={() => setPage("dashboard")}
        />
      )}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { ChevronLeft, ChevronRight, Loader2, Trophy } from "lucide-react";

const DashboardPage = ({ onBack, onSelectMovie }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [watched, setWatched] = useState({});

  useEffect(() => {
    // Load watched state from localStorage
    const savedWatched = localStorage.getItem("mcu-watched");
    if (savedWatched) {
      setWatched(JSON.parse(savedWatched));
    }

    fetch("https://mcuapi.up.railway.app/api/v1/movies")
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.data.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
        setMovies(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const toggleWatched = (movieId) => {
    const newWatched = {
      ...watched,
      [movieId]: !watched[movieId],
    };
    setWatched(newWatched);
    localStorage.setItem("mcu-watched", JSON.stringify(newWatched));
  };

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

  const currentMovie = movies[currentIndex];
  const isWatched = !!watched[currentMovie?.id];

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

          <div className="relative">
            <button
              className="relative w-72 h-[450px] shadow-2xl rounded-xl overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-all duration-500 transform hover:scale-105 bg-black/20 cursor-pointer"
              onClick={() => onSelectMovie(currentMovie)}
            >
              <img
                key={currentMovie?.id}
                src={currentMovie?.cover_url}
                alt={currentMovie?.title}
                className="w-full h-full object-cover animate-in fade-in slide-in-from-right-8 duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/500x750?text=Marvel+Poster";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 text-left">
                <p className="text-sm font-bold text-red-500 uppercase tracking-widest mb-1">
                  {new Date(currentMovie?.release_date).getFullYear()}
                </p>
                <h2 className="text-2xl font-black leading-tight uppercase italic drop-shadow-xl tracking-tighter">
                  {currentMovie?.title}
                </h2>
              </div>
              
              {isWatched && (
                <div className="absolute top-4 right-4 bg-white text-[#e62429] p-2 rounded-full shadow-lg animate-in zoom-in duration-300">
                  <Trophy size={20} className="fill-[#e62429]" />
                </div>
              )}
            </button>
            
            {/* Checkbox Section */}
            <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-center gap-3 bg-black/20 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-lg animate-in slide-in-from-bottom-4 duration-500">
              <Checkbox 
                id={`watched-${currentMovie?.id}`} 
                checked={isWatched}
                onCheckedChange={() => toggleWatched(currentMovie?.id)}
              />
              <label 
                htmlFor={`watched-${currentMovie?.id}`}
                className="text-sm font-black uppercase italic tracking-widest cursor-pointer select-none"
              >
                {isWatched ? "Mission Accomplished" : "Mark as Watched"}
              </label>
            </div>
          </div>

          <Button
            variant="ghost"
            className="absolute right-0 z-10 h-full px-2 hover:bg-black/20 text-white rounded-none transition-colors"
            onClick={nextMovie}
          >
            <ChevronRight size={64} />
          </Button>
        </div>

        <div className="mt-12 flex flex-col items-center gap-1">
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

export default DashboardPage;

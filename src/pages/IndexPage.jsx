import React from "react";
import { Button } from "../components/ui/button";

const IndexPage = ({ onNext }) => (
  <div className="flex flex-col items-center justify-between h-screen bg-[#e62429] text-white overflow-hidden relative font-sans py-2">
    {/* Top Section: Logo - Scaled down for the 550px width */}
    <div className="animate-fade-in z-10 w-full flex justify-center mt-4">
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
    <div className="animate-fade-in z-10 flex flex-col items-center gap-2 mb-10">
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

export default IndexPage;

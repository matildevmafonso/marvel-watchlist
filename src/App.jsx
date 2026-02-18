import React, { useState } from "react";
import IndexPage from "./pages/IndexPage";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";

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

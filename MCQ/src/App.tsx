import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import End from "./components/End";
import Highscores from "./components/Highscores";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route
          path='/end'
          element={
            <End
              resetGame={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
        />
        <Route path='/highscores' element={<Highscores />} />
      </Routes>
    </Router>
  );
}

export default App;

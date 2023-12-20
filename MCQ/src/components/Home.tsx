import React from "react";
import { Link } from "react-router-dom";
import "../../src/css/app.css";

function Home() {
  return (
    <>
      <main className='container'>
        <div id='home' className='flex-center flex-column'>
          <h1>Javascript Quiz</h1>
          <Link to='/game' className='btn'>
            Play
          </Link>
          <Link to='/highscores' className='btn'>
            Highscores
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;

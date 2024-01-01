import React, { useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase-config";
import Highscores from "./Highscores";
import "../../src/css/app.css";

interface EndProps {
  resetGame: () => void;
  gamePoints: number;
}

function End({ resetGame, gamePoints }: EndProps) {
  const [username, setUsername] = useState("");
  const [showHighscores, setShowHighscores] = useState(false);

  const handleSaveScore = async () => {
    try {
      await addDoc(collection(db, "highscores"), {
        username,
        score: gamePoints,
      });

      setShowHighscores(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayAgain = () => {
    resetGame();
  };
  const isSaveButtonDisabled = username.trim() === "";

  return (
    <>
      {showHighscores ? (
        <Highscores />
      ) : (
        <main className='container'>
          <div id='end' className='flex-center flex-column'>
            <h1 id='finalScore'>{`Your final score is: ${gamePoints}`}</h1>
            <form>
              <input
                type='text'
                name='username'
                id='username'
                placeholder='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type='button'
                className='btn'
                id='saveScoreBtn'
                onClick={handleSaveScore}
                disabled={isSaveButtonDisabled}
              >
                Save
              </button>
            </form>
            <button onClick={handlePlayAgain} className='btn'>
              Play Again
            </button>
            <Link to='/' className='btn'>
              Go Home
            </Link>
          </div>
          {showHighscores && <Highscores />}
        </main>
      )}
    </>
  );
}

export default End;

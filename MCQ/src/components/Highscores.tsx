import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../src/css/app.css";
import "../../src/css/highscores.css";

interface Score {
  username: string;
  score: number;
}

function Highscores() {
  const [highScores, setHighScores] = useState<Score[]>([]);
  useEffect(() => {
    const scores: Score[] = JSON.parse(localStorage.getItem("scores") || "[]");
    const top15Highscores = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
    setHighScores(top15Highscores);
  }, []);
  return (
    <>
      <main className='container'>
        <div id='highScores' className='flex-center flex-column'>
          <h1 id='finalScore'>High Scores</h1>
          <ul id='highScoresList'>
            {highScores.map((score, index) => (
              <li className='high-score' key={index}>
                <span>{`${index + 1}. ${score.username} `}</span>
                <span>{score.score}</span>
              </li>
            ))}
          </ul>
          <Link to='/' className='btn'>
            Home
          </Link>
        </div>
      </main>
    </>
  );
}
export default Highscores;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "../../src/css/app.css";
import "../../src/css/highscores.css";
import db from "../firebase-config";

interface Score {
  username: string;
  score: number;
}

function Highscores() {
  const [highScores, setHighScores] = useState<Score[]>([]);

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const scoresCollection = collection(db, "highscores");
        const scoresSnapshot = await getDocs(scoresCollection);
        const scoresData = scoresSnapshot.docs.map(
          (doc) => doc.data() as Score
        );

        const top15Highscores = scoresData
          .sort(
            (a: { score: number }, b: { score: number }) => b.score - a.score
          )
          .slice(0, 15);
        setHighScores(top15Highscores);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHighScores();
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

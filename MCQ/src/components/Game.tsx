import React, { useState, useEffect } from "react";
import Question from "./Question";
import End from "./End";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase-config";
import "../../src/css/app.css";
import "../../src/css/game.css";

interface QuestionData {
  id: number;
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correctAnswer: string;
}

function Game() {
  const gameTime = 100;
  const penaltyPoints = 10;
  const [gamePoints, setGamePoints] = useState(gameTime);
  const [showEnd, setShowEnd] = useState(false);
  const [seconds, setSeconds] = useState(gameTime);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const resetGame = () => {
    setShowEnd(false);
    setSeconds(gameTime);
    setGamePoints(gameTime);
    setCurrentIndex(0);
  };

  const getQuestions = async () => {
    try {
      const questionsCollection = collection(db, "questions");

      const querySnapshot = await getDocs(questionsCollection);

      const questionData: QuestionData[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as QuestionData),
      }));
      setQuestions(questionData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const CountdownTimer = () => {
    useEffect(() => {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(timer);

            if (currentIndex < questions.length - 1) {
              setCurrentIndex((prevIndex) => prevIndex + 1);
              setSeconds(gameTime);
            } else {
              setShowEnd(true);
            }

            return 0;
          } else {
            setGamePoints(prevSeconds - 1);
            return prevSeconds - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }, [currentIndex]);
    return seconds;
  };

  const handleAnswer = (selectedAnswer: string, correctAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      setGamePoints((prevScore) => prevScore);
    } else {
      setSeconds((prevSeconds) => Math.max(0, prevSeconds - penaltyPoints));
      setGamePoints((prevScore) => Math.max(0, prevScore - penaltyPoints));
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowEnd(true);
    }
  };

  if (showEnd) {
    return <End resetGame={resetGame} gamePoints={gamePoints} />;
  } else {
    return (
      <>
        <div id='game' className='justify-center flex-column'>
          <div id='hud'>
            <div className='hud-item'>
              <p id='progressText' className='hud-prefix'>
                Question
              </p>
              <div id='progressBar'>
                <div id='progressBarFull'></div>
                <div></div>
              </div>
            </div>

            <div className='hud-item'>
              <p className='hud-prefix score-prefix'>Score</p>
              <h1 className='hud-main-text' id='score'>
                <CountdownTimer />
              </h1>
            </div>
          </div>
          {currentIndex < questions.length && (
            <Question
              key={questions[currentIndex].id}
              question={questions[currentIndex].question}
              choice1={questions[currentIndex].choice1}
              choice2={questions[currentIndex].choice2}
              choice3={questions[currentIndex].choice3}
              choice4={questions[currentIndex].choice4}
              correctAnswer={questions[currentIndex].correctAnswer}
              onAnswer={(selectedAnswer) =>
                handleAnswer(
                  selectedAnswer,
                  questions[currentIndex].correctAnswer
                )
              }
            />
          )}
        </div>
      </>
    );
  }
}

export default Game;

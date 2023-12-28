import React, { useState, useEffect } from "react";
import End from "./End";
import "../../src/css/app.css";
import "../../src/css/game.css";

function Game() {
  const gameTime = 100;
  const [showEnd, setShowEnd] = useState(false);
  const [seconds, setSeconds] = useState(gameTime);

  const resetGame = () => {
    setShowEnd(false);
    setSeconds(gameTime);
  };

  const CountdownTimer = () => {
    useEffect(() => {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(timer);
            setShowEnd(true);
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    return seconds;
  };

  if (showEnd === true) {
    return <End resetGame={resetGame} />;
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

          <h2 id='question'>What is the correct answer to this questions?</h2>
          <div className='choice-container'>
            <p className='choice-prefix'>A</p>
            <p className='choice-text' data-number='1'>
              Choice 1
            </p>
          </div>
          <div className='choice-container'>
            <p className='choice-prefix'>B</p>
            <p className='choice-text' data-number='2'>
              Choice 2
            </p>
          </div>
          <div className='choice-container'>
            <p className='choice-prefix'>C</p>
            <p className='choice-text' data-number='3'>
              Choice 3
            </p>
          </div>
          <div className='choice-container'>
            <p className='choice-prefix'>D</p>
            <p className='choice-text' data-number='4'>
              Choice 4
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Game;

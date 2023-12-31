import React, { useState } from "react";

interface QuestionProps {
  question: string;
  choice1: string;
  choice2: string;
  choice3: string;
  choice4: string;
  correctAnswer: string;
  onAnswer: (selectedAnswer: string, correctAnswer: string) => void;
}

function Question({
  question,
  choice1,
  choice2,
  choice3,
  choice4,
  correctAnswer,
  onAnswer,
}: QuestionProps) {
  return (
    <div className='question-container'>
      <h2>{question}</h2>
      <div className='choice-container'>
        <p className='choice-prefix'>A</p>
        <p
          className='choice-text'
          data-number='1'
          onClick={() => onAnswer(choice1, correctAnswer)}
        >
          {choice1}
        </p>
      </div>
      <div className='choice-container'>
        <p className='choice-prefix'>B</p>
        <p
          className='choice-text'
          data-number='2'
          onClick={() => onAnswer(choice2, correctAnswer)}
        >
          {choice2}
        </p>
      </div>
      <div className='choice-container'>
        <p className='choice-prefix'>C</p>
        <p
          className='choice-text'
          data-number='3'
          onClick={() => onAnswer(choice3, correctAnswer)}
        >
          {choice3}
        </p>
      </div>
      <div className='choice-container'>
        <p className='choice-prefix'>D</p>
        <p
          className='choice-text'
          data-number='4'
          onClick={() => onAnswer(choice4, correctAnswer)}
        >
          {choice4}
        </p>
      </div>
    </div>
  );
}

export default Question;

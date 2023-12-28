import { Link } from "react-router-dom";
import "../../src/css/app.css";

interface EndProps {
  resetGame: () => void;
}

function End({ resetGame }: EndProps) {
  const handlePlayAgain = () => {
    resetGame();
  };
  return (
    <>
      <main className='container'>
        <div id='end' className='flex-center flex-column'>
          <h1 id='finalScore'></h1>
          <form>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='username'
            />
            <button type='submit' className='btn' id='saveScoreBtn' disabled>
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
      </main>
    </>
  );
}

export default End;

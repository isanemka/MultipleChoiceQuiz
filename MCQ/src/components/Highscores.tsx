import { Link } from "react-router-dom";
import "../../src/css/app.css";
import "../../src/css/highscores.css";

function Highscores() {
  return (
    <>
      <main className='container'>
        <div id='highScores' className='flex-center flex-column'>
          <h1 id='finalScore'>High Scores</h1>
          <ul id='highScoresList'></ul>
          <Link to='/' className='btn'>
            Home
          </Link>
        </div>
      </main>
    </>
  );
}
export default Highscores;

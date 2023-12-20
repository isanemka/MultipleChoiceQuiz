import "../../src/css/app.css";

function End() {
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
          <a className='btn'>Play Again</a>
          <a className='btn'>Go Home</a>
        </div>
      </main>
    </>
  );
}

export default End;

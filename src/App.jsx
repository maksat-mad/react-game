import { useState, useEffect } from 'react';
import Wrong from './components/Wrong';
import Modal from './components/Modal';

function App() {

  const game = [
    { word: 'apple', url: '/src/assets/apple.jpg' },
    { word: 'banana', url: '/src/assets/banana.jpg' },
    { word: 'car', url: '/src/assets/car.jfif' },
    { word: 'aircraft', url: '/src/assets/aircraft.jpg' },
    { word: 'bread', url: '/src/assets/bread.jfif' },
    { word: 'solider', url: '/src/assets/solider.jpg' },
    { word: 'helicopter', url: '/src/assets/helicopter.jpg' }
  ];

  const [input, setInput] = useState('');
  const [current, setCurrent] = useState(0);

  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const [error, setError] = useState(false);
  const [errorUrl, setErrorUrl] = useState('');

  const [hasError, setHasError] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const setRandomPicture = (current) => {
    let randomIndex = 0;
    while (randomIndex === current) {
      randomIndex = Math.floor(Math.random() * game.length);
    }
    setCurrent(randomIndex);
  }

  const handleChange = evt => {
    setInput(evt.target.value);
  }

  const gotIt = () => {
    setHasError(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim().toLowerCase() === game[current].word) {
      setStreak(streak + 1);
      setMaxStreak(streak + 1 > maxStreak ? streak + 1 : maxStreak);
      setError(false);
      setErrorUrl('');
      setShowModal(true);

      localStorage.setItem('streak', streak + 1);
      localStorage.setItem('maxStreak', streak + 1 > maxStreak ? streak + 1 : maxStreak);
    } else {
      const r = game[current].word;
      setError(`The correct answer is ${r}`);
      setErrorUrl(game[current].url);
      setStreak(0);
      setHasError(true);
      localStorage.setItem('streak', 0);
    }

    setInput('');
    setRandomPicture(current);
  }

  useEffect(() => {
    setRandomPicture(current);
    setStreak(parseInt(localStorage.getItem('streak')) || 0);
    setMaxStreak(parseInt(localStorage.getItem('maxStreak')) || 0);
  }, [])

  return (
    <div className="App">
      <div className="min-h-screen bg-slate-800 text-white text-center">
        <header className="p-6 mb-8">
          <h1 className="text-2xl font-bold uppercase">Game write what kind of object</h1>
          <div>
            <p>Received = {streak}</p>
            <p>Maximum = {maxStreak}</p>
          </div>
        </header>

        {hasError ?
          <div>
            <Wrong message={error} url={errorUrl} />
            <button onClick={gotIt} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
              Got It &#128517;
            </button>
          </div>
          :
          <div>
            <div className="text-9xl font-bold mb-8 flex justify-center">
              <img src={game[current].url} alt='Opps something went wrong :(' style={{ width: "18rem", height: "18rem" }} />
            </div>

            <div className="mb-8">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={handleChange}
                  value={input}
                  className="block w-25 bg-transparent border-b-2 border-b-white mx-auto outline-none text-center text-6xl pb-2" />
              </form>
            </div>
          </div>
        }
        {showModal &&
          <Modal props={setShowModal} />
        }
      </div>
    </div>
  );
}

export default App

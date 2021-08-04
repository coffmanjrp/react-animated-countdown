import { useState, useRef, createRef, useEffect } from 'react';
import './App.scss';

function App() {
  const [isHide, setIsHide] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const nums = [3, 2, 1, 0];
  const refs = useRef([createRef(), createRef(), createRef(), createRef()]);
  const countdown = refs.current;

  useEffect(() => {
    runAnimation();

    // eslint-disable-next-line
  }, []);

  const runAnimation = () => {
    countdown[0].current.className = 'in';

    countdown.forEach((count, index) => {
      const nextToLast = countdown.length - 1;

      count.current.addEventListener('animationend', (e) => {
        if (e.animationName === 'goIn' && index !== nextToLast) {
          count.current.className = 'out';
        } else if (e.animationName === 'goOut' && count.current.nextSibling) {
          count.current.nextSibling.className = 'in';
        } else {
          setIsHide(true);
          setIsFinal(true);
        }
      });
    });
  };

  const resetAnimation = () => {
    setIsFinal(false);
    setIsHide(false);

    countdown.forEach((count) => {
      count.current.className = '';
    });

    countdown[0].current.className = 'in';
  };

  const handleClick = () => {
    resetAnimation();
    runAnimation();
  };

  return (
    <>
      <div className={`counter${isHide ? ' hide' : ''}`}>
        <div className="countdown">
          {nums.length > 0 &&
            nums.map((num, index) => (
              <span key={num} ref={refs.current[index]}>
                {num}
              </span>
            ))}
        </div>
        <h4>Get Ready</h4>
      </div>
      <div className={`final${isFinal ? ' show' : ''}`}>
        <h1>GO</h1>
        <button className="btn" onClick={handleClick}>
          Replay
        </button>
      </div>
    </>
  );
}

export default App;

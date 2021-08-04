import { useState, useRef, createRef, useEffect } from 'react';
import './App.scss';

function App() {
  const [isHide, setIsHide] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const countdown = [3, 2, 1, 0];
  const refs = useRef([createRef(), createRef(), createRef(), createRef()]);
  const nums = refs.current;

  useEffect(() => {
    runAnimation();
    // eslint-disable-next-line
  }, []);

  const runAnimation = () => {
    nums[0].current.className = 'in';

    nums.forEach((num, index) => {
      const nextToLast = nums.length - 1;

      num.current.addEventListener('animationend', (e) => {
        if (e.animationName === 'goIn' && index !== nextToLast) {
          num.current.className = 'out';
        } else if (e.animationName === 'goOut' && num.current.nextSibling) {
          num.current.nextSibling.className = 'in';
        } else {
          setIsHide(true);
          setIsFinal(true);
        }
      });
    });
  };

  return (
    <>
      <div className={`counter${isHide ? ' hide' : ''}`}>
        <div className="nums">
          {countdown.length > 0 &&
            countdown.map((count, index) => (
              <span key={count} ref={refs.current[index]}>
                {count}
              </span>
            ))}
        </div>
        <h4>Get Ready</h4>
      </div>
      <div className={`final${isFinal ? ' show' : ''}`}>
        <h1>GO</h1>
        <button className="btn">Replay</button>
      </div>
    </>
  );
}

export default App;

// import { ipcRenderer } from 'electron';
import { useState, useEffect } from 'react';
import Versions from './components/Versions';
import './App.scss';

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  const clickHandler = (): void => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    // @ts-ignore (define in dts)
    window.api.clickCount(count);
  }, [count]);

  return (
    <div className="container">
      <Versions />

      <p>日本語が入ります。</p>

      <div>
        <button onClick={clickHandler}>
          <span>Click {count}</span>
        </button>
      </div>
    </div>
  );
}

export default App;

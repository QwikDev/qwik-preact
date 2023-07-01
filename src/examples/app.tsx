/** @jsxImportSource preact */

import { qwikify$ } from '../preact/qwikify';
import { useState } from 'preact/hooks';

export const App = qwikify$(() => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount((currentCount) => currentCount - 1);

  return (
    <>
      <div>Hello, this is simple Preact counter</div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
});

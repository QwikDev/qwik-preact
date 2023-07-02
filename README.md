# qwik-preact ⚡️

QwikPreact allows adding Preact components into existing Qwik application

## How to Integrate into a Qwik app

Integration is pretty much the same as <https://qwik.builder.io/docs/integrations/react/>.

First, install `@qwikdev/qwik-preact` with npm, pnpm or yarn. Instead of `react` and `react-dom`, you will need to install `preact` and `preact-render-to-string`. And don't forgot `/** @jsxImportSource preact */`

preact.tsx

```tsx
/** @jsxImportSource preact */
import { qwikify$ } from '@qwikdev/qwik-preact';
import { useState } from 'preact/hooks';

// Create Preact component standard way
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button className="preact" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Convert Preact component to Qwik component
export const QCounter = qwikify$(Counter, { eagerness: 'hover' });
```

index.tsx

```tsx
import { component$ } from '@builder.io/qwik';
import { QCounter } from './preact';

export default component$(() => {
  return (
    <main>
      <QCounter />
    </main>
  );
});
```

vite.config.ts

```ts
// vite.config.ts
import { qwikPreact } from '@qwikdev/qwik-preact/vite';
 
export default defineConfig(() => {
   return {
     ...,
     plugins: [
       ..., 
       // The important part
       qwikPreact()
     ],
   };
});
```

Please keep in mind that this is an experimental implementation based on `qwik-react` implementation. So, there might be bugs and unwanted behaviours.

---

## Related

- [Qwik Docs](https://qwik.builder.io/docs/)
- [Qwik on GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Discord](https://qwik.builder.io/chat)
- [Vite](https://vitejs.dev/)
- [Partytown](https://partytown.builder.io/)
- [Mitosis](https://github.com/BuilderIO/mitosis)
- [Builder.io](https://www.builder.io/)

# Qwik qwik-preact ⚡️

## How to Integrate into a Qwik app

Integration is pretty much the same as <https://qwik.builder.io/docs/integrations/react/>.
Instead of `react` and `react-dom`, you will need to install `preact` and `preact-render-to-string`. And don't forgot `/** @jsxImportSource preact */`

preact.tsx

```tsx
/** @jsxImportSource preact */
import { qwikify$ } from '@qwikdev/qwik-preact';
import { useState } from 'preact/hooks';

// Create React component standard way
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button className="preact" onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Convert React component to Qwik component
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

Please keep in mind that this is an experimental implementation based on `qwik-react` implementation. So, there might be bugs and unwanted behaviour.

## Development Builds

- Create a component library
- Vite.js tooling.
- Prettier code formatter.

### Client only

During development, the index.html is not a result of server-side rendering, but rather the Qwik app is built using client-side JavaScript only. This is ideal for development with Vite and its ability to reload modules quickly and on-demand. However, this mode is only for development and does not showcase "how" Qwik works since JavaScript is required to execute, and Vite imports many development modules for the app to work.

```
npm run dev
```

### Server-side Rendering (SSR) and Client

Server-side rendered index.html, with client-side modules prefetched and loaded by the browser. This can be used to test out server-side rendered content during development, but will be slower than the client-only development builds.

```
npm run dev.ssr
```

## Production Builds

A production build should generate the client and server modules by running both client and server build commands.

```
npm run build
```

### Client Modules

Production build that creates only the client-side modules that are dynamically imported by the browser.

```
npm run build.client
```

### Server Modules

Production build that creates the server-side render (SSR) module that is used by the server to render the HTML.

```
npm run build.server
```

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

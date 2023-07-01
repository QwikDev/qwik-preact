export function qwikPreact(): any {
  const OPTIMIZE_DEPS = ['preact', 'preact/jsx-runtime', 'preact-render-to-string'];
  const DEDUPE = ['preact', 'preact-render-to-string'];

  return {
    name: 'vite-plugin-qwik-preact',
    config() {
      return {
        resolve: {
          dedupe: DEDUPE,
        },
        optimizeDeps: {
          include: OPTIMIZE_DEPS,
        },
      };
    },
  };
}

import { type QRL, type Signal, Slot, SSRRaw, SSRStream } from '@builder.io/qwik';
import { getHostProps, mainExactProps, getPreactProps } from './slot';
import { renderToString } from 'preact-render-to-string';
import { isServer } from '@builder.io/qwik/build';

export async function renderFromServer(
  Host: any,
  preactCmp$: QRL<any>,
  scopeId: string,
  props: Record<string, any>,
  ref: Signal<Element | undefined>,
  slotRef: Signal<Element | undefined>,
  hydrationProps: Record<string, any>
) {
  if (isServer) {
    const Cmp = await preactCmp$.resolve();

    const newProps = getPreactProps(props);
    Object.assign(hydrationProps, newProps);
    const html = renderToString(mainExactProps(undefined, scopeId, Cmp, newProps));
    const index = html.indexOf('<!--SLOT-->');
    if (index > 0) {
      const part1 = html.slice(0, index);
      const part2 = html.slice(index + '<!--SLOT-->'.length);
      return (
        <Host ref={ref} {...getHostProps(props)}>
          <SSRStream
            children={async function* () {
              yield <SSRRaw data={part1} />;
              yield (
                <q-slot ref={slotRef}>
                  <Slot />
                </q-slot>
              );
              yield <SSRRaw data={part2} />;
            }}
          ></SSRStream>
        </Host>
      );
    }
    return (
      <>
        <Host ref={ref}>
          <SSRRaw data={html}></SSRRaw>
        </Host>
        <q-slot ref={slotRef}>
          <Slot />
        </q-slot>
      </>
    );
  }
}

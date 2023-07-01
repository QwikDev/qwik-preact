import {
  component$,
  implicit$FirstArg,
  type NoSerialize,
  noSerialize,
  type QRL,
  useTask$,
  SkipRender,
  useSignal,
  Slot,
  RenderOnce,
  useStylesScoped$,
} from '@builder.io/qwik';

import { isBrowser, isServer } from '@builder.io/qwik/build';
import type { FunctionComponent } from 'preact';
import * as client from './client';
import { renderFromServer } from './server-render';
import { getHostProps, main, mainExactProps, useWakeupSignal } from './slot';
import type { Internal, QwikifyOptions, QwikifyProps } from './types';

export function qwikifyQrl<PROPS extends {}>(
  preactCmp$: QRL<FunctionComponent<PROPS & { children?: any }>>,
  opts?: QwikifyOptions
) {
  return component$((props: QwikifyProps<PROPS>) => {
    const { scopeId } = useStylesScoped$(
      `q-slot{display:none} q-slotc,q-slotc>q-slot{display:contents}`
    );
    const hostRef = useSignal<Element>();
    const slotRef = useSignal<Element>();
    const internalState = useSignal<NoSerialize<Internal<PROPS>>>();
    const [signal, isClientOnly] = useWakeupSignal(props, opts);
    const hydrationKeys = {};
    const TagName = opts?.tagName ?? ('qwik-preact' as any);

    // Task takes cares of updates and partial hydration
    useTask$(async ({ track }) => {
      const trackedProps = track(() => ({ ...props }));
      track(signal);

      if (!isBrowser) {
        return;
      }

      // Update
      if (internalState.value) {
        if (internalState.value.root) {
          client.render(
            main(slotRef.value, scopeId, internalState.value.cmp, trackedProps),
            internalState.value.root
          );
        }
      } else {
        const Cmp = await preactCmp$.resolve();
        const hostElement = hostRef.value;
        if (hostElement) {
          // hydration
          if (!isClientOnly) {
            client.hydrate(mainExactProps(slotRef.value, scopeId, Cmp, hydrationKeys), hostElement);
          }
          if (isClientOnly || signal.value === false) {
            client.render(main(slotRef.value, scopeId, Cmp, trackedProps), hostElement);
          }
        }
        internalState.value = noSerialize({
          cmp: Cmp,
          root: hostElement,
        });
      }
    });

    if (isServer && !isClientOnly) {
      const jsx = renderFromServer(
        TagName,
        preactCmp$,
        scopeId,
        props,
        hostRef,
        slotRef,
        hydrationKeys
      );
      return <RenderOnce key={2}>{jsx}</RenderOnce>;
    }

    return (
      <RenderOnce>
        <TagName
          {...getHostProps(props)}
          ref={(el: Element) => {
            if (isBrowser) {
              queueMicrotask(() => {
                const internalData = internalState.value;
                if (internalData && !internalData.root) {
                  client.render(main(slotRef.value, scopeId, internalData.cmp, props), el);
                }
              });
            } else {
              hostRef.value = el;
            }
          }}
        >
          {SkipRender}
        </TagName>
        <q-slot ref={slotRef}>
          <Slot></Slot>
        </q-slot>
      </RenderOnce>
    );
  });
}

export const qwikify$ = /*#__PURE__*/ implicit$FirstArg(qwikifyQrl);

import { onMounted, onUpdated } from 'vue';

type _EventType = keyof HTMLElementEventMap;
type _EventListener<T extends _EventType> = (e: HTMLElementEventMap[T] | Event) => void;
type _EventListeners<T extends _EventType[], U extends _EventListener<_EventType>[] = []> = T extends [infer F extends _EventType, ...infer R extends _EventType[]] ? _EventListeners<R, [...U, (e: HTMLElementEventMap[F] | Event) => void]> : U;

function useEventListeners<K extends _EventType | _EventType[]>(
      element: HTMLElement | Window | null,
      eventTypes: K extends _EventType ? K : K extends [infer F, ...infer R] ? [F, ...R] : never,
      callbacks: K extends _EventType ? _EventListener<K> : K extends _EventType[] ? _EventListeners<K> : never,
      options?: boolean | AddEventListenerOptions
) {
      const _eventTypes = Array.isArray(eventTypes) ? eventTypes : [eventTypes];
      const _callbacks = Array.isArray(callbacks) ? callbacks : [callbacks];

      onMounted(() => {
            if (!element) return;
            _eventTypes.forEach((type, index) => {
                  element.addEventListener(
                        type,
                        e => {
                              _callbacks[index](e);
                        },
                        options
                  );
            });
      });

      onUpdated(() => {
            if (!element) return;
            _eventTypes.forEach((type, index) => {
                  element.removeEventListener(
                        type,
                        e => {
                              _callbacks[index](e);
                        },
                        options
                  );
            });
      });
}

export default useEventListeners;

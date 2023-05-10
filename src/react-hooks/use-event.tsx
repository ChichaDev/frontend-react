import { useCallback, useLayoutEffect, useRef } from "react";

//оборачиваем ф-ю в ref, каждый раз когда меняется ф-я обновляется ref,
// fnRef создасться 1 раз и будет ссылатся на 1 и тот же обьект

export function useEvent<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const eventCb = useCallback(
    (...args: unknown[]) => {
      return fnRef.current.apply(null, args);
    },
    [fnRef]
  );

  return eventCb as unknown as T;
}

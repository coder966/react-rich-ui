import { RefObject, useCallback, useEffect } from 'react';

export default function useClickOutside(outsideRefs: RefObject<HTMLElement | undefined>[], callback: () => void) : void {
  const handler = useCallback((event: MouseEvent) => {
    const insideSome = outsideRefs.some(ref => !ref.current || ref.current.contains(event.target as Node));
    if (!insideSome) {
      callback();
    }
  }, [outsideRefs, callback])

  useEffect(() => {
    document.addEventListener('mousedown', handler); // also works with touchscreens
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [handler]);
}

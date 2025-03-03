import { useEffect, useRef, useState } from "react";

export function useIsOnScreen() {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const threshold = 0;

  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsOnScreen(true);
      },
      {
        root: null,
        threshold: threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, ref.current]);

  return { isOnScreen: isOnScreen, ref };
}

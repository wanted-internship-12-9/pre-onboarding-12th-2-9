import { useEffect, useRef } from 'react';
import { IssueListItem } from '../types/issues';

export const useInfiniteScroll = (callback: () => void, issues: IssueListItem[]) => {
  const targetRef = useRef(null);

  const observerOptions = {
    root: null,
    rootMargin: '80px',
    threshold: 0.5,
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      callback();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [issues]);

  return { targetRef };
};

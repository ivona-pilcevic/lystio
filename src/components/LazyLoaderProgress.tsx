import { useState, useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const STOP_OUR_COUNTER_ON = 90;

const LazyLoaderProgress = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setProgress] = useState(0);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    NProgress.start();

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === STOP_OUR_COUNTER_ON) {
          clearInterval(interval);
          return STOP_OUR_COUNTER_ON;
        }

        const newProgress = Math.min(oldProgress + 10, STOP_OUR_COUNTER_ON);
        NProgress.set(newProgress / 100);
        return newProgress;
      });
    }, 100);

    return () => {
      NProgress.done();
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default LazyLoaderProgress;

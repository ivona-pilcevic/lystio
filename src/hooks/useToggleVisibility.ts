import { useCallback, useState } from "react";

export const useToggleVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  const toggle = useCallback(() => {
    setIsVisible((v) => !v);
  }, []);

  return {
    isVisible,
    show,
    hide,
    toggle,
  };
};

import { useEffect } from "react";

export const useBlockBodyScroll = (block: boolean) => {
  useEffect(() => {
    if (block) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [block]);
};

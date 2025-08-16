import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const useAppDispatch = () => useDispatch();

export const useAppSelector = (selector, fallback = null) => {
  const [isClient, setIsClient] = useState(false);
  const storeValue = useSelector(selector);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? storeValue : fallback;
};

export const useAppSelectorClient = useSelector;

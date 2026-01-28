"use client";
import {
  createContext,
  SetStateAction,
  Dispatch,
  useEffect,
  useRef,
  useState,
  useEffectEvent,
} from "react";

export const themeOptions = ["light", "dark"] as const;
export type ThemeOptions = (typeof themeOptions)[number];

export const ThemeContext = createContext<{
  theme: ThemeOptions | null;
  setTheme: Dispatch<SetStateAction<ThemeOptions | null>>;
}>({
  theme: "light",
  setTheme: () => {},
});

export const currencies = [
  { name: "Naira", sign: "₦" },
  { name: "Euro", sign: "€" },
  { name: "Pounds sterling", sign: "£" },
  { name: "US Dollar", sign: "$" },
];

export function useGetDate() {
  const bootRef = useRef(true);
  const [date, setDate] = useState("");
  const setDateEvent = useEffectEvent(() => {
    const today = new Date();
    const monthPrefix = Number(today.getMonth()) + 1 < 10 ? "0" : "";
    const dayPrefix = Number(today.getDate()) < 10 ? "0" : "";
    setDate(
      today.getFullYear() +
        "-" +
        monthPrefix +
        (Number(today.getMonth()) + 1) +
        "-" +
        dayPrefix +
        today.getDate(),
    );
  });
  useEffect(() => {
    if (bootRef.current) {
      setDateEvent();
      bootRef.current = false;
    }
    // const interval = setInterval(() => {
    //   setTime(new Date());
    // }, 5 * 60 * 1000);

    // return () => clearInterval(interval);
  }, []);

  return date;
}

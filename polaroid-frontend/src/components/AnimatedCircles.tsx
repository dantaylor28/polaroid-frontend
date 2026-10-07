import { useMemo } from "react";
import type { CSSProperties } from "react";

interface AnimatedCirclesProps {
  className: string;
}

interface CirclesStyle extends CSSProperties {
  "--float-x": number;
  "--float-y": number;
  "--float-duration": string;
  "--float-delay": string;
}

export const AnimatedCircles = ({ className }: AnimatedCirclesProps) => {
  const style = useMemo<CirclesStyle>(() => {
    const rand = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    return {
      "--float-x": rand(-100, 100),
      "--float-y": rand(-100, 100),
      "--float-duration": `${rand(10, 26)}s`,
      "--float-delay": `${rand(0, 10)}s`,
    };
  }, []);
  return (
    <div
      style={style}
      className={`absolute rounded-full animate-float-random blur-xl transition-transform duration-500 hover:scale-110 hover:blur-2xl ${className}`}
    />
  );
};

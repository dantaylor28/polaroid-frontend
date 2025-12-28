import React, { useMemo } from "react";

export const AnimatedCircles = ({ className }) => {
  const style = useMemo(() => {
    const rand = (min, max) =>
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
      className={`absolute rounded-full animate-float-random blur-xl transition-transform duration-500 hover:scale-130 ${className}`}
    />
  );
};

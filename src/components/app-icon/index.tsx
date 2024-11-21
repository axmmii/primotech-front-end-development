"use client";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";

export const AppIcon: React.FC = () => {
  const { mode } = useContext(ColorModeContext);
  const iconSrc = mode === "dark" ? "/icon-light.png" : "/icon-dark.png";

  return (
    <img 
      src={iconSrc}
      alt="PMT Icon"
      width={32}
      height={32}
    />
  );
};

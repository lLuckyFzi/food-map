import React, { ReactNode } from "react";
import { Montserrat, Playfair_Display } from 'next/font/google'

import { cn } from "@aroma/utils/cn";

const montserrat = Montserrat({subsets: ['latin'], variable: "--font-montserrat"})
const playfair_display = Playfair_Display({subsets: ['latin'], variable: "--font-playfair_display"})

type FontFamily = "montserrat" | "playfair_display"
type Tags = "p" | "div" | "span" | "h1" | "h2" | "h3" | "h4";

interface TypographyProps {
  children: ReactNode;
  as?: Tags;
  font?: FontFamily;
  className?: string;
}

function Typography(props: TypographyProps) {
  const { children, as = "p", className, font, ...otherProps } = props;
  
  const Tag = as;

  const fontClass = font === 'montserrat' ? montserrat.className : font === 'playfair_display' ? playfair_display.className : montserrat.className;

  return <Tag className={cn(fontClass, className)} {...otherProps}>
        {children}
  </Tag>;
}

export default Typography;

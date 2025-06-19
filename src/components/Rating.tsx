import React, { ReactNode } from "react";
import { BiSolidStar } from "react-icons/bi";
import Typography from "./Typography";
import { twMerge } from "tailwind-merge";

interface RatingProps {
  rate: number;
  icon?: ReactNode;
  className?: string;
}

function Rating(props: RatingProps) {
  const { rate, className, icon } = props;

  return (
    <div className="flex gap-x-2 items-center">
      {!icon ? <BiSolidStar className={"w-5 h-5 text-yellow-600"} /> : icon}
      <Typography className={twMerge("text-white font-semibold", className)}>
        {rate}/5
      </Typography>
    </div>
  );
}

export default Rating;

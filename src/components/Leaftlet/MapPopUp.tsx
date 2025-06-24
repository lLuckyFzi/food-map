import { Button, Typography } from "antd";
import Image from "next/image";
import React from "react";
import { BiSolidStar } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { Popup } from "react-leaflet";

interface MapPopUpProps {
  id: number;
  name: string;
  address: string;
  img: string;
  type: string;
  rating: number;
  selectMapHandler: (id: null | number) => void
}

function MapPopUp(props: MapPopUpProps) {
  return (
    <Popup className="custom-popup" maxWidth={400}>
      <div className="flex gap-x-5 w-[300px] max-w-[90vw]">
        <div>
          <Image
            src={props.img}
            alt="pop-img"
            width={999}
            height={999}
            className="w-32 h-full rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <BiSolidStar className="text-yellow-500 w-5 h-5" />
            <Typography className="font-medium">{props.rating || "0"}/5</Typography>
          </div>
          <Typography className="text-xl font-medium">
            {props.name || "Place"}
          </Typography>
          <div className="flex gap-x-1 items-start">
            <FaLocationDot className="w-4 h-4 text-gray-500" />
            <Typography className="break-words">
              {props.address || "Place address"}
            </Typography>
          </div>
          <Button onClick={() => props.selectMapHandler(props.id)}>Detail</Button>
        </div>
      </div>
    </Popup>
  );
}

export default MapPopUp;

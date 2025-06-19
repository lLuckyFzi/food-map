import { Button, Tag } from "antd";
import Image from "next/image";
import React from "react";
import {
  BiBookmark,
  BiLocationPlus,
  BiSolidBookmark,
  BiSolidStar,
} from "react-icons/bi";

import Typography from "@aroma/components/Typography";
import CardImage from "../../../../public/img/caffe-ex.png";
import { PlaceDataModel } from "../data/PlaceDataTemp";
import Rating from "@aroma/components/Rating";

type PlaceCardProps = PlaceDataModel & {
  myBookmark: PlaceDataModel[];
  onAddBookmark: (d: PlaceDataModel) => void;
  onSelectMapHandler: (d: number | null) => void;
};

const PlaceCard = React.memo(function PlaceCard(props: PlaceCardProps) {
  const {
    name,
    address,
    img,
    distance,
    rating,
    type,
    onAddBookmark,
    id,
    myBookmark,
    onSelectMapHandler,
    lat,
    lng,
  } = props;

  const isInBookmark = myBookmark.find((d) => d.id === id);

  return (
    <div className="bg-white rounded-md shadow-lg overflow-hidden relative group">
      <div className="h-44 relative w-full overflow-hidden">
        <Image
          src={img || CardImage}
          alt="cafe-ex"
          width={9999}
          height={9999}
          className="w-full h-full"
        />
        <button
          onClick={() => onSelectMapHandler(id)}
          className={`absolute bottom-0 left-0 right-0 h-0 group-hover:h-14 bg-blue-400 text-white flex items-center justify-center transition-all duration-300 overflow-hidden`}
        >
          <span className="text-white font-normal text-sm cursor-pointer w-full h-full text-center flex items-center justify-center">
            Detail
          </span>
        </button>
        <div className="w-full flex justify-between absolute top-0 my-3 px-5">
          <Rating rate={rating} />
          <Button
            type="text"
            onClick={() =>
              onAddBookmark({ id, address, distance, img, name, rating, type, lat, lng })
            }
            icon={
              isInBookmark?.id ? (
                <BiSolidBookmark className="w-8 h-8 text-white" />
              ) : (
                <BiBookmark className="w-8 h-8 text-white" />
              )
            }
          />
        </div>
      </div>
      <div className="flex justify-between px-6 mb-6 mt-2">
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex">
            <Tag className="rounded-full px-6 flex items-center justify-center py-1 bg-blue-500 text-white">
              <Typography>{type || "Type"}</Typography>
            </Tag>
          </div>
          <Typography className="text-3xl font-medium">
            {name || "Title"}
          </Typography>
          <div className="flex items-center gap-x-2">
            <BiLocationPlus className="w-4 h-4 text-gray-500" />
            <Typography className="text-gray-500">
              {address || "Address"}
            </Typography>
          </div>
        </div>
        <Typography>{distance}Km</Typography>
      </div>
    </div>
  );
})

export default React.memo(PlaceCard);

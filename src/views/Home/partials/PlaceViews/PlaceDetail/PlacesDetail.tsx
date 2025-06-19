import React from "react";
import { PlaceDataModel, PlaceDataTemp } from "../../../data/PlaceDataTemp";
import Image from "next/image";
import Typography from "@aroma/components/Typography";
import { Button, Tag } from "antd";
import { RiBookMarkedFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import Rating from "@aroma/components/Rating";
import { BiSolidStar } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import CommentCard from "./partials/CommentCard";
import CommentForm from "./partials/CommentForm";
import { useComments } from "@aroma/hooks/useComments";
import { useAllRatings } from "@aroma/hooks/useAllRatings";

interface PlacesDetailProps {
  placeId: number;
  places: PlaceDataModel[];
  onDeleteSelectedMap: () => void;
}

const PlacesDetail = React.memo(function PlacesDetail(
  props: PlacesDetailProps
) {
  const { placeId, onDeleteSelectedMap, places } = props;

  const comments = useComments(placeId);
  const ratings = useAllRatings();

  const placeDetail = places.find((d) => d.id === placeId);

  return (
    <div className="flex flex-col p-3 gap-y-4">
      <div className="overflow-hidden rounded-2xl relative">
        <Button
          type="text"
          className="absolute top-5 left-7"
          icon={<BsArrowLeft className="w-8 h-8 text-white" />}
          onClick={onDeleteSelectedMap}
        />
        <Image
          alt="img-list"
          className="w-full h-[350px] object-cover"
          width={999}
          height={999}
          src={placeDetail?.img as string}
        />
      </div>
      <div className="px-5 flex flex-col gap-y-4">
        <div className="flex flex-col w-full gap-y-2">
          <div className="w-auto">
            <Tag className="px-6 rounded-full bg-blue-500 text-white py-1">
              {placeDetail?.type || "Tag"}
            </Tag>
          </div>
          <div className="flex justify-between w-full items-center">
            <Typography font="playfair_display" className="text-5xl font-bold">
              {placeDetail?.name || "Name"}
            </Typography>
            <RiBookMarkedFill className="text-gray-800 w-7 h-7" />
          </div>
          <div className="flex gap-x-4 items-center">
            <FaLocationDot className="text-gray-600 w-4 h-4" />
            <Typography className="text-gray-600 text-lg">
              Jl. Sangkali
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 mt-6">
          <Typography
            font="playfair_display"
            className="text-2xl font-semibold"
          >
            About The Place
          </Typography>
          <Typography className="text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            provident consequuntur ex accusantium! Necessitatibus debitis quo
            cum numquam nemo officiis dicta est velit, odit minima quisquam
            sequi quam iusto error molestiae consequuntur eaque illum placeat
            dolor a, vitae iste provident.
          </Typography>
        </div>
        <div className="flex flex-col gap-y-2 mt-6">
          <Typography
            font="playfair_display"
            className="text-2xl font-semibold"
          >
            Rating
          </Typography>
          <Rating
            rate={ratings[placeId]?.average || 0}
            icon={<BiSolidStar className={"w-8 h-8 text-yellow-500"} />}
            className="text-gray-600 text-2xl"
          />
        </div>
        <div className="w-full my-8">
          <Button className="bg-blue-500 text-white w-full py-5 flex items-center justify-center rounded-xl hover:bg-white hover:text-gray-600">
            Show Route
          </Button>
        </div>
        <div>
          <div className="flex flex-col gap-y-2">
            <Typography
              font="playfair_display"
              className="text-2xl font-semibold"
            >
              Comments
            </Typography>
            <Typography font="montserrat" className="">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet
              ab nesciunt quaerat sequi praesentium quidem enim nostrum.
              Nesciunt quod rem ullam in illo quas quo.
            </Typography>
          </div>
          <div className="flex flex-col gap-y-5 my-8">
            {comments.map((d) => {
              return (
                <CommentCard
                  key={d.id}
                  placeImage={placeDetail?.img as string}
                  comments={d}
                />
              );
            })}
            <div className="w-full">
              <CommentForm placeId={placeId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default React.memo(PlacesDetail);

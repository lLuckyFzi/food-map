import Rating from "@aroma/components/Rating";
import Typography from "@aroma/components/Typography";
import { CommentModel } from "@aroma/hooks/useComments";
import Image from "next/image";
import React from "react";

interface CommentCardProps {
  placeImage: string;
  comments: CommentModel;
}

function CommentCard(props: CommentCardProps) {
  const { placeImage, comments } = props;

  return (
    <div className="border border-gray-400 rounded-2xl p-4 overflow-hidden flex flex-col gap-y-6">
      <div className="flex gap-x-4">
        <Image
          className="w-14 h-14 rounded-full"
          alt="profile-user"
          width={999}
          height={999}
          src={placeImage}
        />
        <div>
          <Typography className="text-2xl font-medium">
            {comments.name || "Name"}
          </Typography>
          <Rating rate={comments.rating} className="text-gray-600" />
        </div>
      </div>
      <Typography>{comments.comment || "Comment"}</Typography>
    </div>
  );
}

export default CommentCard;

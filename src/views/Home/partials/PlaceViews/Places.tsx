import React, { useCallback, useMemo, useState } from "react";
import { PlaceDataModel } from "../../data/PlaceDataTemp";
import PlaceCard from "../PlaceCard";
import { message } from "antd";
import { usePlaceContenxt } from "@aroma/store/usePlaceContext";
import { useAllRatings } from "@aroma/hooks/useAllRatings";

interface PlacesProps {
  selectMapHandler: (id: null | number) => void;
}

function Places(props: PlacesProps) {
  const { selectMapHandler } = props;

  const ctxPlaces = usePlaceContenxt();
  const places = ctxPlaces.places;

  const ratings = useAllRatings();

  const [myBookmark, setMyBookmark] = useState<PlaceDataModel[]>([]);

  // console.log("Bookmark: ", myBookmark);

  const addBookmark = useCallback(
    (data: PlaceDataModel) => {
      const isBookmarked = myBookmark.some((d) => d.id === data.id);

      if (isBookmarked) {
        setMyBookmark((prev) => prev.filter((d) => d.id !== data.id));
        message.open({
          type: "success",
          content: "Success remove from your Bookmark",
        });
      } else {
        message.open({
          type: "success",
          content: "Success added to your Bookmark",
        });
        setMyBookmark((prev) => {
          return [...prev, { ...data }];
        });
      }
    },
    [myBookmark]
  );

  const renderedPlaces = useMemo(() => {
    return places.map((d: PlaceDataModel) => {
      const ratingData = ratings[d.id];
      return (
        <PlaceCard
          key={d.id}
          {...d}
          rating={ratingData ? ratingData.average : 0}
          myBookmark={myBookmark}
          onAddBookmark={addBookmark}
          onSelectMapHandler={selectMapHandler}
        />
      );
    });
  }, [places, myBookmark, addBookmark, selectMapHandler, ratings]);

  return (
    <div className="flex flex-col gap-y-8 w-full px-6 mb-6">
      {renderedPlaces}
    </div>
  );
}

export default Places;

import React, { useCallback, useMemo, useState } from "react";
import { PlaceDataModel } from "../../data/PlaceDataTemp";
import PlaceCard from "../PlaceCard";
import { message, Pagination, Spin } from "antd";
import { useAllRatings } from "@aroma/hooks/useAllRatings";
import Typography from "@aroma/components/Typography";

interface PlacesProps {
  filteredPlaces: PlaceDataModel[];
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  selectMapHandler: (id: null | number) => void;
}

function Places(props: PlacesProps) {
  const { selectMapHandler, filteredPlaces, scrollContainerRef } = props;

  const ratings = useAllRatings();

  const [myBookmark, setMyBookmark] = useState<PlaceDataModel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedPlaces = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPlaces.slice(start, start + pageSize);
  }, [filteredPlaces, currentPage]);

  const isDataPlaceReady = paginatedPlaces?.length > 0;

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
    return paginatedPlaces.map((d: PlaceDataModel) => {
      const ratingData = ratings[d.id];
      return (
        <PlaceCard
          key={d.id}
          {...d}
          rating={ratingData ? ratingData.average : 0}
          myBookmark={myBookmark}
          onAddBookmark={addBookmark}
          onSelectMapHandler={(id) => {
            scrollContainerRef.current?.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            selectMapHandler(id);
          }}
        />
      );
    });
  }, [paginatedPlaces, myBookmark, addBookmark, selectMapHandler, ratings]);

  return (
    <div className="flex flex-col gap-y-8 w-full px-6 mb-6">
      {isDataPlaceReady ? (
        renderedPlaces
      ) : (
        <div className="flex items-center justify-center w-full">
          <Typography>No Data</Typography>
        </div>
      )}
      {filteredPlaces.length > pageSize && (
        <div className="flex justify-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredPlaces.length}
            onChange={(page) => {
              setCurrentPage(page);
              scrollContainerRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

export default Places;

import { Layout } from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import MapView from "./partials/MapView";
import Filters from "./partials/Filters";
import Places from "./partials/PlaceViews/Places";
import PlacesDetail from "./partials/PlaceViews/PlaceDetail/PlacesDetail";
import { usePlaceContenxt } from "@aroma/store/usePlaceContext";
import { useAllRatings } from "@aroma/hooks/useAllRatings";

export interface FilterState {
  rating: number;
  category: string | null;
  keyword: string;
}

function Home() {
  const ctxPlaces = usePlaceContenxt();

  const scrollablePlacesRef = useRef<HTMLDivElement>(null);

  const places = ctxPlaces.places;
  const { lat, lng } = ctxPlaces.mePosition;
  const loadingPoss = ctxPlaces.isLoadingPoss;

  const ratings = useAllRatings()

  const [selectedMap, setSelectedMap] = useState<number | null>(null);
  const [flyToTrigger, setFlyToTrigger] = useState<[number, number] | null>(
    null
  );
  const [filter, setFilter] = useState<FilterState>({
    rating: 0,
    category: null,
    keyword: "",
  });

  const dummyPosition = {
    lat: -6.9446311,
    lng: 107.6495019,
  };

  const [mapCenter, setMapCenter] = useState(() => {
    return lat !== null && lng !== null ? { lat, lng } : dummyPosition;
  });

  const selectMapHandler = useCallback(
    (id: null | number) => {
      setSelectedMap(id);
      if (id !== null) {
        const selectedPlace = places.find((p) => p.id === id);
        if (selectedPlace) {
          setMapCenter({ lat: selectedPlace.lat, lng: selectedPlace.lng });
          setFlyToTrigger([selectedPlace.lat, selectedPlace.lng]);
        }
      }
    },
    [places]
  );

  const filteredPlaces = useMemo(() => {
    return ctxPlaces.places.filter((place) => {
      const placesRating = ratings[place.id]?.average ?? 0

      const matchesRating = placesRating >= filter.rating;
      const matchesCategory = filter.category
        ? place.type === filter.category
        : true;
      const matchesKeyword = place.name
        .toLowerCase()
        .includes(filter.keyword.toLowerCase());
      return matchesRating && matchesCategory && matchesKeyword;
    });
  }, [ctxPlaces.places, filter]);

  const onDeleteSelectedMap = () => {
    setSelectedMap(null);
  };

  useEffect(() => {
    if (lat !== null && lng !== null) {
      setMapCenter({ lat, lng });
    }
  }, [lat, lng]);

  return (
    <Layout style={{ height: "100vh" }}>
      <div className="flex h-full overflow-hidden">
        <div
          className="w-[500px] flex items-center flex-col gap-y-8 overflow-y-scroll"
          ref={scrollablePlacesRef}
        >
          {!selectedMap && <Filters filter={filter} setFilter={setFilter} />}
          {selectedMap ? (
            <PlacesDetail
              places={places}
              placeId={selectedMap}
              onDeleteSelectedMap={onDeleteSelectedMap}
            />
          ) : (
            <Places
              selectMapHandler={selectMapHandler}
              filteredPlaces={filteredPlaces}
              scrollContainerRef={scrollablePlacesRef}
            />
          )}
        </div>
        <MapView
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          isLoadingPoss={loadingPoss}
          places={places}
          mePosition={{ lat, lng }}
          selectMapHandler={selectMapHandler}
          flyToTrigger={flyToTrigger}
          clearTrigger={() => setFlyToTrigger(null)}
          selectedPlaceId={selectedMap}
        />
      </div>
    </Layout>
  );
}

export default Home;

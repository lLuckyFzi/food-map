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
  const isPositionReady = ctxPlaces.isPositionReady;

  const ratings = useAllRatings();

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

  const [mapCenter, setMapCenter] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

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
    return places.filter((place) => {
      const placesRating = ratings[place.id]?.average ?? 0;

      const matchesRating = placesRating >= filter.rating;
      const matchesCategory = filter.category
        ? place.type === filter.category
        : true;
      const matchesKeyword = place.name
        .toLowerCase()
        .includes(filter.keyword.toLowerCase());
      return matchesRating && matchesCategory && matchesKeyword;
    });
  }, [places, filter]);

  const placesWithRating = useMemo(() => {
    return places.map((d) => {
      const ratingData = ratings[d.id]
      return {
        ...d,
        rating: ratingData?.average ?? 0,
      }
    })
  }, [places, ratings])

  const onDeleteSelectedMap = () => {
    setSelectedMap(null);
  };

  const mountPosition =
    loadingPoss ||
    lat === null ||
    lng === null ||
    mapCenter.lat === null ||
    mapCenter.lng === null;

  useEffect(() => {
    const isReady =
      isPositionReady &&
      lat !== null &&
      lng !== null &&
      mapCenter.lat === null &&
      mapCenter.lng === null;

    if (isReady) {
      setMapCenter({ lat, lng });
      setFlyToTrigger([lat, lng]);
    }
  }, [isPositionReady, lat, lng, mapCenter]);

  if (mountPosition) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg">Menentukan posisi Anda...</p>
      </div>
    );
  }

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
          places={placesWithRating}
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

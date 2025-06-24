import { Spin } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import { PlaceDataModel } from "../data/PlaceDataTemp";
import { usePlaceContenxt } from "@aroma/store/usePlaceContext";

const MapComponent = dynamic(
  () => import("@aroma/components/Leaftlet/MapLeaflet"),
  {
    ssr: false,
  }
);

export interface MePosition {
  lat: null | number;
  lng: null | number;
}

interface MapViewProps {
  isLoadingPoss: boolean;
  mePosition: MePosition;
  selectedPlaceId: number | null;
  places: PlaceDataModel[];
  selectMapHandler: (id: null | number) => void;
  mapCenter: { lat: number | null; lng: number | null };
  setMapCenter: React.Dispatch<React.SetStateAction<{
    lat: number | null;
    lng: number | null;
}>>
  flyToTrigger: [number, number] | null;
  clearTrigger: () => void;
}

function MapView(props: MapViewProps) {
  const {
    isLoadingPoss,
    selectedPlaceId,
    mePosition,
    places,
    selectMapHandler,
    mapCenter,
    setMapCenter,
    flyToTrigger,
    clearTrigger,
  } = props;

  const ctxPlaces = usePlaceContenxt()
  const isPositionReady = ctxPlaces.isPositionReady

  const { lat, lng } = mePosition;

  return (
    <div className="flex-1 h-screen justify-center items-center flex relative">
      {isLoadingPoss && isPositionReady ? (
        <Spin spinning={true} tip="Mencari lokasi anda" />
      ) : (
        <MapComponent
          places={places}
          selectMapHandler={selectMapHandler}
          mapCenter={mapCenter}
          flyToTrigger={flyToTrigger}
          setMapCenter={setMapCenter}
          clearTrigger={clearTrigger}
          selectedPlaceId={selectedPlaceId}
          mePosition={{
            lat,
            lng,
          }}
        />
      )}
    </div>
  );
}

export default MapView;

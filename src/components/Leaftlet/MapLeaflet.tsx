"use client";

import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { PlaceDataModel } from "@aroma/views/Home/data/PlaceDataTemp";
import MapPopUp from "./MapPopUp";
import MapEventsHandler from "./MapEventHandler";
import FlyToMyLocationButton from "./FlyToMeButton";
import MapUpdater from "@aroma/utils/MapUpdater";
import { Spin } from "antd";

interface MapLeafletProps {
  mePosition: {
    lat: null | number;
    lng: null | number;
  };
  selectedPlaceId: number | null;
  places: PlaceDataModel[];
  flyToTrigger: [number, number] | null;
  selectMapHandler: (id: null | number) => void;
  clearTrigger: () => void;
  mapCenter: { lat: number | null; lng: number | null };
  setMapCenter: React.Dispatch<React.SetStateAction<{
    lat: number | null;
    lng: number | null;
}>>
}

const MePositionIcon = L.icon({
  iconUrl: "/icons/user-icon.png",
  iconSize: [42, 42],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MealIcon = L.icon({
  iconUrl: "/icons/meal-icon.png",
  iconSize: [32, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const CupIcon = L.icon({
  iconUrl: "/icons/cup-icon.png",
  iconSize: [32, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

function MapLeaflet(props: MapLeafletProps) {
  const {
    mePosition,
    places,
    selectMapHandler,
    flyToTrigger,
    clearTrigger,
    selectedPlaceId,
    mapCenter = { lat: -6.9446311, lng: 107.6495019 },
  } = props;

  const isValidLatLng = !mePosition.lat !== null && !mePosition.lng !== null;
  const isValidMapCenter = mapCenter.lat !== null && mapCenter.lng !== null;

  const isPlacesReady = places.length > 0;

  const markersRef = React.useRef<Record<number, L.Marker>>({});
  React.useEffect(() => {
    if (selectedPlaceId && markersRef.current[selectedPlaceId]) {
      markersRef.current[selectedPlaceId].openPopup();
    }
  }, [selectedPlaceId]);

  if (!isValidLatLng || !isValidMapCenter) {
    return <Spin spinning={isValidLatLng} tip="Loading Map..." />;
  }

  return (
    <div className="w-full h-full">
      <MapContainer
        // key={`${mapCenter.lat}-${mapCenter.lng}`}
        center={[mapCenter.lat as number, mapCenter.lng as number]}
        zoom={20}
        className="h-full w-full"
      >
        <MapUpdater
          position={flyToTrigger as [number, number]}
          clearTrigger={clearTrigger}
        />
        <FlyToMyLocationButton lat={mePosition.lat} lng={mePosition.lng} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {isValidLatLng && (
          <>
            {/* for update position */}
            <MapEventsHandler setMapCenter={props.setMapCenter} />
            <Marker
              position={[mePosition.lat as number, mePosition.lng as number]}
              icon={MePositionIcon}
            />
          </>
        )}

        {isPlacesReady &&
          places.map((d) => {
            const isRestaurant = d.type === 'restaurant'
            
            return (
              <Marker
                key={d.id}
                position={[d.lat, d.lng]}
                icon={isRestaurant ? MealIcon : CupIcon}
                ref={(ref) => {
                  if (ref) {
                    markersRef.current[d.id] = ref;
                  }
                }}
              >
                <MapPopUp
                  id={d.id}
                  name={d.name}
                  type={d.type}
                  address={d.address}
                  rating={d.rating as number}
                  img={d.img}
                  selectMapHandler={selectMapHandler}
                />
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}

export default MapLeaflet;

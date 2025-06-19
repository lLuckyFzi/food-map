"use client";

import { useMap } from "react-leaflet";
import React from "react";
import { Button } from "antd";
import { BiCurrentLocation } from "react-icons/bi";

interface FlyToMyLocationButtonProps {
  lat: number | null;
  lng: number | null;
}

export default function FlyToMyLocationButton({
  lat,
  lng,
}: FlyToMyLocationButtonProps) {
  const map = useMap();

  const handleClick = () => {
    if (lat !== null && lng !== null) {
      map.flyTo([lat, lng], map.getZoom());
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <Button
        type="default"
        icon={<BiCurrentLocation className="w-8 h-8 text-blue-500" />}
        className="bg-white w-full h-10 !p-6 flex items-center justify-center rounded shadow hover:bg-gray-100 transition"
        onClick={handleClick}
      />
    </div>
  );
}

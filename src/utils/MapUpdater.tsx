import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapUpdater({
  position,
  clearTrigger,
}: {
  position: [number, number];
  clearTrigger: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!position || position.length !== 2) return;

    map.flyTo(position, map.getZoom(), {
      animate: true,
      duration: 1.5,
    });

    clearTrigger();
  }, [position, map, clearTrigger]);

  return null;
}

export default MapUpdater;

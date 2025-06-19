// MapEventsHandler.tsx
import { useMapEvents } from "react-leaflet";

function MapEventsHandler({ setMapCenter }: { setMapCenter: (pos: { lat: number; lng: number }) => void }) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      setMapCenter({ lat: center.lat, lng: center.lng });
    },
  });

  return null;
}

export default MapEventsHandler;

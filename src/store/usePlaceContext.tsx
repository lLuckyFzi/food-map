import { fetchNearbyPlaces, ModelPlaceType } from "@aroma/utils/fetchOverpass";
import {
  PlaceDataModel,
  PlaceDataTemp,
} from "@aroma/views/Home/data/PlaceDataTemp";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface PlaceContextType {
  mePosition: {
    lat: null | number;
    lng: null | number;
  };
  isLoadingPoss: boolean;
  placeType: ModelPlaceType;
  setPlaceType: (type: ModelPlaceType) => void;
  places: PlaceDataModel[];
  refreshPlaces: () => void;
}

const PlaceContext = createContext<PlaceContextType | undefined>(undefined);

export function PlacesProvider(props: { children: ReactNode }) {
  const { children } = props;

  const [mePosition, setMePosition] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });
  const [isLoadingPoss, setIsLoadingPoss] = useState(true);
  const [placeType, setPlaceType] = useState<ModelPlaceType>("all");
  const [places, setPlaces] = useState<PlaceDataModel[]>([]);

  const refreshPlaces = useCallback(async() => {
    if (mePosition.lat && mePosition.lng) {
      try {
        const fetched = await fetchNearbyPlaces(
          mePosition.lat,
          mePosition.lng,
          placeType
        );
        setPlaces(fetched);
      } catch (error) {
        console.error("Error fetching from Overpass:", error);
        setPlaces([]);
      }
    }
  }, [mePosition.lat, mePosition.lng, placeType]);

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    const watch = navigator.geolocation.watchPosition(
      async (pos) => {
        const lat = pos.coords.latitude as number;
        const lng = pos.coords.longitude as number;

        setMePosition({ lat, lng });
        setIsLoadingPoss(false);
      },
      (err) => {
        console.log("err watch geolocation:", err);
        setIsLoadingPoss(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  useEffect(() => {
    refreshPlaces();
  }, [refreshPlaces]);

  const contextValue = useMemo(
    () => ({
      mePosition,
      isLoadingPoss,
      placeType,
      setPlaceType,
      places,
      refreshPlaces,
    }),
    [mePosition, isLoadingPoss, placeType, places, refreshPlaces]
  );

  return (
    <PlaceContext.Provider value={contextValue}>
      {children}
    </PlaceContext.Provider>
  );
}

export const usePlaceContenxt = () => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error("usePlaceContext mush be used within a place provider!");
  }
  return context;
};

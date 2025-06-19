import { PlaceDataModel } from "@aroma/views/Home/data/PlaceDataTemp";

export type ModelPlaceType = "all" | "cafe" | "restaurant";

export interface OverpassElement {
  id: number;
  lat?: number;
  lon?: number;
  tags?: {
    name?: string;
    [key: string]: any;
  };
  type: any;
  center?: {
    lat: number;
    lon: number;
  };
}

export async function fetchNearbyPlaces(
  lat: number,
  lng: number,
  type: ModelPlaceType
): Promise<PlaceDataModel[]> {
  const radius = 4000;

  let query = `
    [out:json];
    (
    `;

  if (type === "all" || type === "restaurant") {
    query += ` node["amenity"="restaurant"](around:${radius}, ${lat}, ${lng});
                way["amenity"="restaurant"](around:${radius}, ${lat}, ${lng});
                relation["amenity"="restaurant"](around:${radius}, ${lat}, ${lng});`;
  }
  if (type === "all" || type === "cafe") {
    query += ` node["amenity"="cafe"](around:${radius}, ${lat}, ${lng});
                way["amenity"="cafe"](around:${radius}, ${lat}, ${lng});
                relation["amenity"="cafe"](around:${radius}, ${lat}, ${lng});`;
  }

  query += `
        );
        out center;
    `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });

  if (!res.ok) {
    throw new Error("Failed fetch Overpass API");
  }

  const data = await res.json();
  const transformedData = (data.elements as OverpassElement[])
    .filter((el) => (el.lat && el.lon) || el.center)
    .map((d: OverpassElement): PlaceDataModel => {
      const lat = d.lat ?? d.center?.lat ?? 0;
      const lng = d.lon ?? d.center?.lon ?? 0;

      return {
        id: d.id,
        name: d.tags?.name || `Unknown ${d.id}`,
        address: d.tags?.["addr:street"] || "Alamat tidak diketahui",
        type: d.tags?.amenity || "Unknown",
        img: "/img/caffe-ex.png",
        rating: 0,
        lat,
        lng,
      };
    });

  return transformedData;
}

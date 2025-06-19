export interface PlaceDataModel {
  id: number;
  name: string;
  address: string;
  rating: number;
  distance?: number;
  type: string;
  img: string;
  lat: number;
  lng: number;
}

export const PlaceDataTemp: PlaceDataModel[] = [
  {
    id: 1,
    name: "Kopi Bagi",
    address: "Jl. Soreang No.1",
    rating: 4,
    lat: -7.0185,
    lng: 107.5478,
    type: "Caffe",
    img: "/img/caffe-ex.png",
    distance: 6
  },
  {
    id: 2,
    name: "Dragonstorm",
    address: "Jalan Gandasari No. 105, Warung Lobak",
    rating: 4.5,
    lat: -7.0186,
    lng: 107.5487,
    type: "Caffe",
    img: "/img/caffe-ex.png",
    distance: 4
  },
];

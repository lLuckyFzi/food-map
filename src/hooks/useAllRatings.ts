import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@aroma/lib/firebase";

export interface RatingSummary {
  [placeId: number]: {
    total: number;
    average: number;
  };
}

export function useAllRatings() {
  const [ratings, setRatings] = useState<RatingSummary>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "comments"), (snapshot) => {
      const ratingMap: { [placeId: number]: number[] } = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (!data.placeId || typeof data.rating !== "number") return;

        if (!ratingMap[data.placeId]) ratingMap[data.placeId] = [];
        ratingMap[data.placeId].push(data.rating);
      });

      const summary: RatingSummary = {};
      for (const placeId in ratingMap) {
        const ratings = ratingMap[placeId];
        const total = ratings.length;
        const avg = ratings.reduce((sum, r) => sum + r, 0) / total;
        summary[+placeId] = { total, average: parseFloat(avg.toFixed(1)) };
      }

      setRatings(summary);
    });

    return () => unsubscribe();
  }, []);

  return ratings;
}

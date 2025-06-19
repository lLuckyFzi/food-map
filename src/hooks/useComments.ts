import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@aroma/lib/firebase";

export interface CommentModel {
  id: string;
  placeId: number;
  name: string;
  comment: string;
  rating: number;
  timestamp: any;
}

export function useComments(placeId: number) {
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "comments"),
      where("placeId", "==", placeId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CommentModel[];

      setComments(data);
    });

    return () => unsubscribe();
  }, [placeId]);

  return comments;
}

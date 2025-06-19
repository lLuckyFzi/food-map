import { auth, db } from "@aroma/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signInWithGoogleAndSyncUser = async () => {
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      fullname: user.displayName || "",
      email: user.email || "",
      createdAt: new Date(),
      role: "user",
    });
  }

  return user;
};

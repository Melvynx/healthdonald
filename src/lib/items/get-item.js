import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getItem = async (id) => {
  const itemRef = collection(db, "items");
  const itemSnap = await getDoc(doc(itemRef, id));

  if (itemSnap.exists()) {
    return itemSnap.data();
  }

  return null;
};

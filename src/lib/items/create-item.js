import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createItem = async (id, item) => {
  const itemRef = collection(db, "items");
  await setDoc(doc(itemRef, id), item);
};

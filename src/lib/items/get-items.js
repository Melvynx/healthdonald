import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const getItems = async (category) => {
  let docRef = collection(db, "items");

  if (category) {
    docRef = query(docRef, where("category", "==", category));
  }

  const docSnap = await getDocs(docRef);
  console.log({ docSnap });

  const data = [];
  docSnap.forEach((d) => {
    data.push({
      id: d.id,
      ...d.data(),
    });
  });

  return data;
};

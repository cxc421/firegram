import { useState, useEffect } from "react";
import { projectFireStore } from "../firebase/config";

interface Doc {
  id: string;
  createdAt: firebase.firestore.Timestamp | null;
  url: string;
}

const useFireStore = (collectionName: string) => {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    const unSubscribe = projectFireStore
      .collection(collectionName)
      // 利用 createdAt 排序, 並由大到小
      .orderBy("createdAt", "desc")
      // 每次 collectionName 的 colleciont 有變化, 都會觸發
      // 第一次 binding 也會觸發
      .onSnapshot((snap) => {
        const documents = snap.docs.map((doc) => {
          const { createdAt, url } = doc.data();
          const id = doc.id;
          return {
            id,
            createdAt,
            url,
          };
        });
        setDocs(documents);
      });

    return unSubscribe;
  }, [collectionName]);

  return { docs };
};

export default useFireStore;

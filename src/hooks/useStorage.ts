import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFireStore,
  timestamp,
} from "../firebase/config";
import * as firebase from "firebase";

const useStorage = (file: File | null) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      // upload refrerences
      const storageRef = projectStorage.ref(file.name);
      const collectionRef = projectFireStore.collection("images");

      // upload
      storageRef.put(file).on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snap) => {
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          // console.log("SET!");
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timestamp();
          await collectionRef.add({ url, createdAt });
          setUrl(url);
        }
      );
    }
  }, [file]);

  return { progress, url, error };
};

export default useStorage;

import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";
import * as firebase from "firebase";

const useStorage = (file: File) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    // upload refrerences
    const storageRef = projectStorage.ref(file.name);

    // upload
    storageRef.put(file).on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;

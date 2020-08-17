import React, { FC, useEffect } from "react";
import useStorage from "../hooks/useStorage";

type Props = {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const ProgressBar: FC<Props> = ({ file, setFile }) => {
  // console.log("render");
  const { progress, url, error } = useStorage(file);
  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url]);

  return <div className="progress-bar" style={{ width: `${progress}%` }}></div>;
};

export default ProgressBar;

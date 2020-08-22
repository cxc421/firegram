import React, { FC, useEffect } from "react";
import useStorage from "../hooks/useStorage";
import { motion } from "framer-motion";

type Props = {
  file: File;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const ProgressBar: FC<Props> = ({ file, setFile }) => {
  // console.log("render");
  const { progress, url } = useStorage(file);
  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
    />
  );
};

export default ProgressBar;

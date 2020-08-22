import React, { FC } from "react";
import { motion } from "framer-motion";
import useFireStore from "../hooks/useFirestore";
import { collectionName } from "../contants";

type Props = {
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
};

const ImageGrid: FC<Props> = ({ setSelectedImg }) => {
  const { docs } = useFireStore(collectionName);
  // console.log(docs);
  return (
    <div className="img-grid">
      {docs.map((doc) => (
        <motion.div
          className="img-wrap"
          key={doc.id}
          onClick={() => setSelectedImg(doc.url)}
          whileHover={{ opacity: 1 }}
          layout
        >
          <motion.img
            src={doc.url}
            alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // delay 1 second
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ImageGrid;

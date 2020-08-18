import React, { FC } from "react";
import useFireStore from "../hooks/useFirestore";
import { collectionName } from "../contants";

type Props = {};

const ImageGrid: FC<Props> = () => {
  const { docs } = useFireStore(collectionName);
  // console.log(docs);
  return (
    <div className="img-grid">
      {docs.map((doc) => (
        <div className="img-wrap" key={doc.id}>
          <img src={doc.url} alt="uploaded pic" />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;

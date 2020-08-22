import React, { FC, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  selectedImg: string | null;
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
};

const Modal: FC<Props> = ({ selectedImg, setSelectedImg }) => {
  const backDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backDropRef.current && selectedImg) {
      backDropRef.current.focus();
    }
  }, [selectedImg]);

  const handleClickBackDrop = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: HTMLDivElement }
  ) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <AnimatePresence>
      {selectedImg && (
        <motion.div
          className="backdrop"
          onClick={handleClickBackDrop}
          ref={backDropRef}
          // -1: 可以用 JS focus, 但是不能用 tab 按鈕聚焦
          tabIndex={-1}
          onKeyDown={(e) => e.key === "Escape" && setSelectedImg(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          key="modal-backdrop"
        >
          <motion.img
            src={selectedImg}
            alt="enlarged pic"
            initial={{ y: "-30vh" }}
            animate={{ y: "0" }}
            // exit={{ y: "-100vh" }}
            key="modal-image"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

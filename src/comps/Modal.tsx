import React, { FC, useEffect, useRef } from "react";

type Props = {
  selectedImg: string;
  setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
};

const Modal: FC<Props> = ({ selectedImg, setSelectedImg }) => {
  const backDropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backDropRef.current) {
      backDropRef.current.focus();
    }
  }, []);

  const handleClickBackDrop = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> & { target: HTMLDivElement }
  ) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <div
      className="backdrop"
      onClick={handleClickBackDrop}
      ref={backDropRef}
      // -1: 可以用 JS focus, 但是不能用 tab 按鈕聚焦
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && setSelectedImg(null)}
    >
      <img src={selectedImg} alt="enlarged pic" />
    </div>
  );
};

export default Modal;

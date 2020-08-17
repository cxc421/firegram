import React, { FC, useState } from "react";
import ProgressBar from "./ProgressBar";

type Props = {};

const UploadForm: FC<Props> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files![0] as File | undefined; // fix native type check
    const allowedTypes = ["image/png", "image/jpeg"];

    if (selected && allowedTypes.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError("Please select an image file (png or jpeg)");
    }
  };

  return (
    <form className="upload-form">
      <label className="upload-form__btn">
        <input type="file" accept="image/*" onChange={handleChange} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export default UploadForm;

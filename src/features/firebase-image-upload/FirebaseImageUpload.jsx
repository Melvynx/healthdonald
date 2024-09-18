import { Input } from "@/components/ui/input";
import { useState } from "react";

export const FirebaseImageUpload = ({ image, onChange }) => {
  const [preview, setPreview] = useState(image);

  const onImageUpload = async (event) => {
    const image = event.target.files[0];
    setPreview(URL.createObjectURL(image));
    onChange(image);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Input type="file" onChange={onImageUpload} />
      </div>
      <div className="ml-auto aspect-square w-12 rounded-md bg-accent shadow-lg">
        {preview && <img src={preview} alt="Image preview" />}
      </div>
    </div>
  );
};

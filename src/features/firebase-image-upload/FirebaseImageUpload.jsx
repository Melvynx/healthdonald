/* eslint-disable @next/next/no-img-element */
import { Input } from "@/components/ui/input";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const FirebaseImageUpload = ({ image, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(image);

  const onImageUpload = async (event) => {
    const image = event.target.files[0];
    setPreview(URL.createObjectURL(image));
    setLoading(true);
    const storageRefName = `images/${image.name}`;

    const storageRef = ref(storage, storageRefName);
    try {
      await uploadBytes(storageRef, image);
      const downloadURL = await getDownloadURL(storageRef);
      onChange(downloadURL);
      setLoading(false);
    } catch {
      toast.error("Error uploading image");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Input type="file" onChange={onImageUpload} />
        {loading && <Loader className="animate-spin" />}
      </div>
      <div className="ml-auto aspect-square w-12 rounded-md bg-accent shadow-lg">
        {preview && <img src={preview} alt="Image preview" />}
      </div>
    </div>
  );
};

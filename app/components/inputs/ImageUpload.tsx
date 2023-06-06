"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ImageUpload: React.FC<Props> = ({ value, onChange }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="gebbh0ze"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer transition hover:opacity-70 border-dashed border-2 p-20 border-neutral-300 text-neutral-600 flex flex-col items-center justify-center gap-4"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg"> Click to upload</div>
            {value && (
              <div className="absolute w-full h-full inset-0 ">
                <Image
                  alt="upload"
                  src={value}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;

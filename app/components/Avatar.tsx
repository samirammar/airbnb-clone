"use client";
import Image from "next/image";

type Props = {
  src: string | null | undefined;
};

const Avatar: React.FC<Props> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      alt="avatar"
      width={30}
      height={30}
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;

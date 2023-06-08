import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

type Props = {
  currentUser?: User | null;
  listingId: string;
};

const HeartButton: React.FC<Props> = ({ listingId, currentUser }) => {
  const hasFavorite = false;
  const toggleFavorite = () => {};
  return (
    <div
      onClick={toggleFavorite}
      className="relative transition cursor-pointer hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />

      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;

"use client";
import React from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  onClick: (value: string) => void;
  selected?: boolean;
};

const CategoryInput: React.FC<Props> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={24} />
      <p className="font-semibold">{label}</p>
    </div>
  );
};

export default CategoryInput;

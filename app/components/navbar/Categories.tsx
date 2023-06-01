import React from "react";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";

const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This is property is close to beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has widmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
];
const Categories = () => {
  return (
    <div className="flex flex-row items-center justify-between overscroll-x-auto pt-4">
      Categories
    </div>
  );
};

export default Categories;

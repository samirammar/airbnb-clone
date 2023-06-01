import React from "react";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";
import Category from "./Category";

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
  const params = useSearchParams();
  const categoryParam = params?.get("category");
  const pathName = usePathname();

  if (pathName !== "/") {
    return null;
  }
  return (
    <div className="flex flex-row items-center justify-between overscroll-x-auto pt-4">
      {categories.map((category) => (
        <Category
          key={category.label}
          icon={category.icon}
          label={category.label}
          selected={categoryParam === category.label}
        />
      ))}
    </div>
  );
};

export default Categories;

"use client";
import React from "react";
import { TbBeach, TbMountain } from "react-icons/tb";
import {
  GiIsland,
  GiWindmill,
  GiBoatFishing,
  GiForestCamp,
  GiCastle,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import Category from "./Category";

export const categories = [
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
  {
    label: "Coutryside",
    icon: TbMountain,
    description: "This property has the coutryside!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an islands!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: GiBoatFishing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Comping",
    icon: GiForestCamp,
    description: "This property has comping activities!",
  },
  {
    label: "Article",
    icon: GiCaveEntrance,
    description: "This property has comping activities!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is in the luxurious!",
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
    <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
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

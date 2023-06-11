"use client";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import React from "react";
import Heading from "../Heading";

type Props = {
  id: string;
  title: string;
  locationValue: string;
  imageSrc: string;
  currentUser?: User | null;
};

const ListingHead: React.FC<Props> = ({
  id,
  title,
  locationValue,
  imageSrc,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <div>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
    </div>
  );
};

export default ListingHead;

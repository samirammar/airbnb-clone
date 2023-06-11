"use client";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "./HeartButton";

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
      <div className="w-full relative overflow-hidden rounded-xl h-[60vh]">
        <Image
          src={imageSrc}
          fill
          alt="image"
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;

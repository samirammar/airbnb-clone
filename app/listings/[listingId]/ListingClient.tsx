import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listing/ListingHead";
import { categories } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import React, { useMemo } from "react";

type Props = {
  reservation?: Reservation;
  listing: Listing & { user: User };
};

const ListingClient: React.FC<Props> = ({ reservation, listing }) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={listing.user}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;

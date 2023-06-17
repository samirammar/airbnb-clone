import React from "react";
import Container from "../components/Container";
import { Listing, User } from "@prisma/client";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";

type Props = {
  listings: Listing[];
  currentUser?: User | null;
};

const FavoritesClient: React.FC<Props> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subTitle="List of places you have favorited!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {listings.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;

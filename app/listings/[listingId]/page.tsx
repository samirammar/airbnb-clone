import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import React from "react";

type Props = {
  listingId?: string;
};

const ListingPage = async ({ params }: { params: Props }) => {
  const listing = await getListingById(params.listingId);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return <div>ListingPage</div>;
};

export default ListingPage;

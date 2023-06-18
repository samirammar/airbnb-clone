import EmptyState from "./components/EmptyState";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "@/app/components/Container";
import { getCurrentUser } from "./actions/getCurrentUser";
import ListingCard from "./components/listing/ListingCard";

interface Props {
  searchParams: IListingsParams;
}

export const dynamic = "force-dynamic";

const Home = async ({ searchParams }: Props) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pt-24">
        {listings.map((listing: any) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Home;

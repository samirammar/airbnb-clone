import Image from "next/image";
import EmptyState from "./components/EmptyState";
import getListings from "./actions/getListings";
import Container from "@/app/components/Container";

export default async function Home() {
  const listings = await getListings();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pt-24">
        {listings.map((listing: any) => {
          return <div key={listing.id}></div>;
        })}
      </div>
    </Container>
  );
}

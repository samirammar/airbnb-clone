import { getCurrentUser } from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subTitle="Looks like you haven't reserved any trips"
      />
    );
  }
  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;

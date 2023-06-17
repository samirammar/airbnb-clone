import { getCurrentUser } from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";
import EmptyState from "../components/EmptyState";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subTitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return <div>ReservationsPage</div>;
};

export default ReservationsPage;

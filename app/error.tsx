"use client";
import EmptyState from "./components/EmptyState";

type Props = { error: Error };

const ErrorState: React.FC<Props> = ({ error }) => {
  return <EmptyState title="Uh oh" subTitle="Something went wrong!" />;
};

export default ErrorState;

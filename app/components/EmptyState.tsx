import React from "react";
import Heading from "./Heading";
import { useRouter } from "next/navigation";
import Button from "./Button";

type Props = {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
};

const EmptyState: React.FC<Props> = ({
  title = "No exect matches",
  subTitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-[60vh]">
      <Heading center title={title} subTitle={subTitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;

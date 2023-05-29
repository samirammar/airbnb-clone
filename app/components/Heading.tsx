"use client";

type Props = {
  title: string;
  subTitle?: string;
  center?: boolean;
};

const Heading: React.FC<Props> = ({ title, subTitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="font-bold text-2xl">{title}</div>
      <div className="font-light mt-2 text-neutral-500">{subTitle}</div>
    </div>
  );
};

export default Heading;

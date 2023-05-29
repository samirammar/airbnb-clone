"use client";

type Props = {
  title: string;
  subTitle?: string;
  center?: boolean;
};

const Heading: React.FC<Props> = ({ title, subTitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h3 className="font-bold text-2xl">{title}</h3>
      <p className="font-light mt-2 text-neutral-500">{subTitle}</p>
    </div>
  );
};

export default Heading;

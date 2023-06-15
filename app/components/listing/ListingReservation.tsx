"use client";

import React from "react";
import { Range, RangeKeyDict } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

type Props = {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: RangeKeyDict) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

const ListingReservation: React.FC<Props> = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="font-semibold text-2xl">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        onChange={onChangeDate}
        disabledDates={disabledDates}
        value={dateRange}
      />
      <hr />
      <div className="p-4">
        <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
      </div>
      <div className="flex flex-row items-center justify-center p-4 font-semibold text-lg">
        <span>total </span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservation;

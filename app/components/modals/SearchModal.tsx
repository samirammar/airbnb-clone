"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import { Range, RangeKeyDict } from "react-date-range";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathRoomCount, setBathRoomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [location, setLocation] = useState<CountrySelectValue>();

  const Map: any = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    if (step === STEPS.INFO) return;
    setStep((value) => value + 1);
  }, [step]);

  const onSubmit = useCallback(() => {
    if (step === STEPS.INFO) return onNext();

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      bathRoomCount,
      roomCount,
    };

    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    onNext,
    params,
    location?.value,
    guestCount,
    bathRoomCount,
    roomCount,
    dateRange.startDate,
    dateRange.endDate,
    searchModal,
    router,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;

    return "Back";
  }, [step]);

  const handleDateChange = (value: RangeKeyDict) => {
    setDateRange({
      startDate: value.selection.startDate,
      endDate: value.selection.endDate,
      key: value.selection.key,
    });
  };

  const bodyContent = () => {
    if (step === STEPS.LOCATION) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do wanna go?"
            subTitle="Find the perfect location!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setLocation(value as CountrySelectValue)}
          />
          <hr />
          <Map center={location?.latlng} />
        </div>
      );
    } else if (step === STEPS.DATE) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you plan to go?"
            subTitle="Make sure everyone is free!"
          />
          <Calendar value={dateRange} onChange={handleDateChange} />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="More information"
            subTitle="Find your perfect place!"
          />
          <Counter
            title="Guests"
            subTitle="How many guests are coming?"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
          />
          <Counter
            title="Rooms"
            subTitle="How many rooms do you need?"
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
          />
          <Counter
            title="Bathrooms"
            subTitle="How many bathrooms do you need?"
            value={bathRoomCount}
            onChange={(value) => setBathRoomCount(value)}
          />
        </div>
      );
    }
  };

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent()}
    />
  );
};

export default SearchModal;

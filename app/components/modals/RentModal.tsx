"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "",
      category: "",
      roomCount: 1,
      bathroomCount: 1,
      geustCount: 1,
      location: null,
      price: 1,
    },
  });

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;

    return "Back";
  }, [step]);

  let bodyContent = () => {
    if (step === STEPS.CATEGORY) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="which of these best describes your place?"
            subTitle="Pick a category"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((cat) => (
              <div className="col-span-1" key={cat.label}>
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === cat.label}
                  icon={cat.icon}
                  label={cat.label}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else if (step === STEPS.LOCATION) {
      return <div></div>;
    } else if (step === STEPS.INFO) {
    } else if (step === STEPS.IMAGES) {
    } else {
    }
  };

  return (
    <Modal
      title="Airbnb your home!"
      secondaryActionLabel={secondaryActionLabel}
      actionLabel={actionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent()}
    />
  );
};

export default RentModal;

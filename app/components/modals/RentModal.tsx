"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

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
      guestCount: 1,
      location: null,
      price: 1,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map: any = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="where is your place located"
            subTitle="Help guests find you!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
          <Map center={location?.latlng} />
        </div>
      );
    } else if (step === STEPS.INFO) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subTitle="Whate amenities do you have?"
          />
          <Counter
            title="Guests"
            subTitle="How many guests do you allow?"
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <hr />
          <Counter
            title="Rooms"
            subTitle="How many rooms do you have?"
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <hr />
          <Counter
            title="Bathrooms"
            subTitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      );
    } else if (step === STEPS.IMAGES) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subTitle="Show guests whate your place looks like!"
          />
          <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>
      );
    } else if (step === STEPS.DESCRIPTION) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place?"
            subTitle="Short and sweet works best!"
          />
          <Input
            id="title"
            label="Title"
            register={register}
            errors={errors}
            required
            disabled={isLoading}
          />
          <hr />
          <Input
            id="description"
            label="Description"
            register={register}
            errors={errors}
            required
            disabled={isLoading}
          />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Now, set your price"
            subTitle="How much do you charge per night!"
          />
          <Input
            id="price"
            label="Price"
            type="number"
            formatPrice
            register={register}
            errors={errors}
            required
            disabled={isLoading}
          />
        </div>
      );
    }
  };

  return (
    <Modal
      title="Airbnb your home!"
      secondaryActionLabel={secondaryActionLabel}
      actionLabel={actionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent()}
    />
  );
};

export default RentModal;

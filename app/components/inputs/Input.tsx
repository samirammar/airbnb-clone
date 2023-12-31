"use client";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type Props = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const Input: React.FC<Props> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute left-2 top-5"
        />
      )}
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
          ${formatPrice ? "pl-9" : "pl4"}
          ${
            errors[id]
              ? "border-rose-500 focus:border-rose-500"
              : "border-neutral-300 focus:border-black"
          }
        `}
        placeholder=" "
      />
      <label
        className={`absolute text-lg duration-150 transform scale-75 -translate-y-4 top-5 z-10 origin-[0]
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${formatPrice ? "left-9" : "left-4"}
          ${errors[id] ? "text-rose-500" : "text-zinc-500"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

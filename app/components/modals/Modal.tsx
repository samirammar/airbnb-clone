"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

type Props = {
  isOpen?: boolean;
  disabled?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  actionLabel: string;
  secondaryActionLabel?: string;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
};

const Modal: React.FC<Props> = ({
  isOpen,
  disabled,
  onClose,
  onSubmit,
  secondaryAction,
  actionLabel,
  secondaryActionLabel,
  title,
  body,
  footer,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  // modal is close
  if (!isOpen) return null;

  // modal is open
  return (
    <div className="flex items-center justify-center inset-0 overflow-x-hidden overflow-y-auto fixed z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto">
        <div
          className={`
            translate-x-0 duration-300 h-full
            ${
              showModal
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
            }
          `}
        >
          <div className="translate-x-0 h-full md:h-auto lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-center p-6 rounded-t relative border-b-[1px]">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size={18} />
              </button>
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            {/* Body */}
            <div className="flex-auto p-6 relative">{body}</div>
            {/* Footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row gap-4 items-center w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

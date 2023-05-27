'use client'
import { useCallback, useEffect, useState } from "react";

type Props = {
    isOpen?: boolean,
    disabled?: boolean,
    onClose: ()=> void,
    onSubmit: ()=> void,
    secondaryAction?: ()=> void,
    actionLabel?: string,
    secondaryLabel?: string,
    title?: string,
    body?: React.ReactElement,
    footer?: React.ReactElement,
}

const Modal:React.FC<Props> = ({
    isOpen,
    disabled,
    onClose,
    onSubmit,
    secondaryAction,
    actionLabel,
    secondaryLabel,
    title,
    body,
    footer
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(()=>{
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(()=>{
    if(disabled) return;

    setShowModal(false);
    setTimeout(()=>{
      onClose();
    }, 300)
  }, [disabled, onClose]);

  const handleSubmit = useCallback(()=>{
    if(disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(()=>{
    if(disabled || !secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  // modal is close
  if(!isOpen) return null;
  // modal is open
  
  return (
    <div>Modal</div>
  )
}

export default Modal;
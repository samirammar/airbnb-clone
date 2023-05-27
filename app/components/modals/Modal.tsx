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
  return (
    <div>Modal</div>
  )
}

export default Modal;
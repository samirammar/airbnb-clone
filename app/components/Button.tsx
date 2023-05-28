'use client';
import { IconType } from 'react-icons'

type Props = {
    label: string,
    outline?: boolean,
    disabled?: boolean,
    small?: boolean,
    icon?: IconType,
    onClick: (e:React.MouseEvent<HTMLButtonElement>)=> void,
}

const Button:React.FC<Props> = ({
    label,
    outline,
    disabled,
    small,
    icon: Icon,
    onClick
}) => {
  return (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`
            relative w-full rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70
            ${outline? 'bg-white border-black text-black':'bg-rose-500 border-rose-500 text-white'}
            ${small? 'py-1 text-sm font-light border[1px]':'py-3 text-md font-semibold border-2'}
        `}
    >
        {Icon && (<Icon className='absolute left-4' size={24}  />)}
        {label}
    </button>
  )
}

export default Button
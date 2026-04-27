interface ActionButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary'; // Bővíthető
  className?: string;
  type?: 'button' | 'submit';
}

export const AddButton = ({
  label,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ActionButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
        bg-primary text-white  w-[211px]
        disabled:bg-opacity-75 disabled:cursor-not-allowed
        active:scale-95
        ${className}
      `}
    >
      {label}
    </button>
  );
};

type ButtonProps = {
  label: string;
  variant?: 'primary' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

export function Button({
  label,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  children,
}: ButtonProps) {

  return (
    <button type={type} className={`btn btn-${variant}`} disabled={disabled} onClick={onClick}>
      {children ?? label}
    </button>
  );
}

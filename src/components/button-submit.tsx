type SubmitButtonProps = {
  disabled?: boolean;
  children: React.ReactNode;
};

export default function SubmitButton({ children, disabled = false }: SubmitButtonProps) {
  return (
    <button className="btn btn-primary btn-lg" disabled={disabled}>
      {children}
    </button>
  );
}

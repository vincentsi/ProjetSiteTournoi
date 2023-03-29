
export function ButtonPrimary({ children, onClick, isDisabled }) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type="button"
      className="btn btn-primary button"
    >
      {children}
    </button>
  );
}

export function ButtonPrimary({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="btn btn-primary button"
    >
      {children}
    </button>
  );
}
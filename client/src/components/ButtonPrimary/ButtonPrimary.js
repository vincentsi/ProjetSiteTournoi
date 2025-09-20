export function ButtonPrimary({
  children,
  onClick,
  isDisabled,
  style,
  onMouseEnter,
  onMouseLeave,
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type="button"
      className="btn btn-primary button"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}

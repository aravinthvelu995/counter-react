import PropTypes from "prop-types";
import { MouseEventHandler } from "react";

const Button = ({
  name,
  className,
  onClick,
  disabled,
}: {
  name: string;
  className?: string;
  onClick: MouseEventHandler;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`primary-button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;

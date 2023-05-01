import React from "react";
type props = {
  name?: string;
  disabled?: boolean;
  onClick?: (a: any) => void;
  children?: JSX.Element | JSX.Element[] | number;
  className?: string;
};
const Button = ({ name, disabled, onClick, children, className }: props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`rounded-md ${
        disabled ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
      } px-4 py-2 text-sm mb-3 font-base text-white transition duration-200  active:bg-blue-700 ${className}`}
    >
      {name ? name : children}
    </button>
  );
};

export default Button;

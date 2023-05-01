import { NavLink } from "react-router-dom";
type props = {
  name: string;
  to: string;
};

const ButtonLink = ({ name, to }: props) => {
  return (
    <NavLink to={to}>
      <button
        type="button"
        className="rounded-md bg-blue-500 px-4 py-2 text-sm mb-3 font-base text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700"
      >
        {name}
      </button>
    </NavLink>
  );
};

export default ButtonLink;

import { NavLink } from "react-router-dom";

type props = {
  children: JSX.Element | JSX.Element[];
};
const Breadcrumb = ({ children }: props) => {
  return (
    <ul className="flex items-center">
      <li className="inline-flex items-center">
        <NavLink to="/admin" className="text-gray-600 hover:text-blue-500">
          <i className="bi bi-house"></i>
        </NavLink>

        <span className="mx-4 h-auto text-gray-400 font-medium">
          <i className="bi bi-chevron-right"></i>
        </span>
      </li>

      {Array.isArray(children) ? (
        children.map((val, index) => {
          return (
            <li key={index} className="inline-flex items-center">
              <span className="text-gray-600 hover:text-blue-500">{val}</span>

              {index === children.length - 1 ? (
                ""
              ) : (
                <span className="mx-4 h-auto text-gray-400 font-medium pointer-event-none">
                  <i className="bi bi-chevron-right"></i>
                </span>
              )}
            </li>
          );
        })
      ) : (
        <li className="inline-flex items-center text-gray-600 hover:text-blue-500">
          <span className="text-gray-600 hover:text-blue-500">{children}</span>
        </li>
      )}
    </ul>
  );
};

export default Breadcrumb;

import { NavLink } from "react-router-dom";

import module from "./Header.module.css";

const Header = () => {
  return (
    <header className={module.header}>
      <div className={module.container}>
        <NavLink to="/" className={module.logo}>
          VIN<span className={module.accent}>Decoder</span>
        </NavLink>

        <nav className={module.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? module.activeLink : module.link
            }
            end
          >
            Головна
          </NavLink>
          <NavLink
            to="/variables"
            className={({ isActive }) =>
              isActive ? module.activeLink : module.link
            }
          >
            Змінні
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

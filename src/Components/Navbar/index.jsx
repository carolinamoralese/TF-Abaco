import { NavLink } from "react-router-dom";

const Navbar = () => {
    const activeStyle = "underline underline-offset-4 bg-yellow-300 text-white"; // Fondo de color verde (#d2de38)
    
  return (
    <nav>
      <ul>
        <li>
          <NavLink 
          to="/"
          className={({ isActive }) => (isActive ? activeStyle : undefined)}>Inicio</NavLink> 
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/records"
          className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >Constancias</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/certificates"
          className={({ isActive }) => (isActive ? activeStyle : undefined)}>
          Certificados</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/indicators"
          className={({ isActive }) => (isActive ? activeStyle : undefined)}>
          Rendimientos</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };

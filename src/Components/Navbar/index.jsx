import { NavLink } from "react-router-dom";
import './index.css'

const Navbar = () => {
  const activeStyle = "underline underline-offset-4 bg-amarillo text-white"; // Fondo de color verde (#d2de38)
  
return (
  <div className="flex mt-40 ml-8">
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

  </div>
  
);
};

export { Navbar };
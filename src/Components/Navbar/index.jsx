import { NavLink } from "react-router-dom";
import logoColor from "../../assets/logocolor.png";
import cosecha from "../../assets/EDITABL-PLATAFORMA-10.png";
import hoja from "../../assets/hoja.png";
import './index.css'

export const  Barrasuperior = () => {
  return (
    <div className="barrasuperior">
      <img className="cosecha" src={cosecha} alt="LogoCosecha" />
      <div className="menú--lateral" />
      <div className="texto--plataforma--logo">
      <img className="logo-color" src={logoColor} alt="LogoColor" />
        <div className="barra--lateral--texto--abaco">
          <p className="text-2">Plataforma   <br />
ABACO</p>
        </div>
      </div>
      <div className="nombre--roldeusuario">
        <div className="imagenperfil">
          <div className="frame-1-8-5-7">
            <p className="text-3">􀉩</p>
          </div>
        </div>
        <div className="nombre--tipodeusuario">
          <p className="text-4">Bienvenido, nombre de usuario</p>
          <p className="text-5">  Revisor logistica</p>
        </div>
      </div>
    </div>
  )
}

const Navbar = () => {
  const activeStyle = "bg-amarillo text-white rounded-r-full w-60 h-8"; // Fondo de color verde (#d2de38)
  
return (
  <div className="flex mt-40 ml-0">
<nav className="fixed top-40 left-0 mt-0 w-72 h-screen shadow-xl space-y-8">
    <ul>
      <li className="mt-40">
      <NavLink 
              to="/home"
              className={({ isActive }) => (isActive ? `flex items-center ${activeStyle}` : undefined)}
            >
              <div className="flex items-center">
                <img className="w-10 ml-8 mr-4" src={hoja} alt="hoja" />
                Inicio
              </div>
            </NavLink> 
      </li>
    </ul>
    <ul>
      <li>
        <NavLink to="/records"
              className={({ isActive }) => (isActive ? `flex items-center ${activeStyle}` : undefined)}
              >
                <div className="flex items-center">
                  <img className="w-10 ml-8 mr-4" src={hoja} alt="hoja" />
                  Constancias
                </div>
              </NavLink> 
      </li>
    </ul>
    <ul>
      <li>
        <NavLink to="/certificates"
              className={({ isActive }) => (isActive ? `flex items-center ${activeStyle}` : undefined)}
              >
                <div className="flex items-center">
                  <img className="w-10 ml-8 mr-4" src={hoja} alt="hoja" />
                  Certificados
                </div>
              </NavLink> 
      </li>
    </ul>
    <ul>
      <li>
        <NavLink to="/indicators"
              className={({ isActive }) => (isActive ? `flex items-center ${activeStyle}` : undefined)}
              >
                <div className="flex items-center">
                  <img className="w-10 ml-8 mr-4" src={hoja} alt="hoja" />
                  Rendimientos
                </div>
              </NavLink> 
      </li>
    </ul>
  </nav>

  </div>
  
);
};

export { Navbar };
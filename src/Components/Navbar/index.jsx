import { auth } from '../../firebase'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import logoColor from "../../assets/logocolor.png";
import cosecha from "../../assets/EDITABL-PLATAFORMA-10.png";
import hoja from "../../assets/hoja.png";
import { getUserInfoByEmail } from "../../servicios/firebaseService"
import './index.css'

export const  Barrasuperior = () => {
 
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log('Cierre de sesión exitoso');
        // Elimina los datos del usuario del localStorage en el cierre de sesión
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión', error);
      });
  };

  const getRoleFromEmail = (email) => {
    if (email === 'ingridbrown@abaco.org.co' || email === 'logisticatest@abaco.org.co') {
      return 'Logística';
    } else if (email === 'nubiahernandez@abaco.org.co' || email === 'contabilidadtest@abaco.org.co') {
      return 'Contabilidad';
    } else if (email === 'fiscaltest@abaco.org.co') {
      return 'Revisor Fiscal';
    }
    return '';
  };

  const userRole = getRoleFromEmail(userEmail);

  return (
    <div className="barrasuperior">
      <img className="cosecha" src={cosecha} alt="LogoCosecha" />
      {/* <div className="menú--lateral" /> */}
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
          <p className="text-4">Bienvenido, {userEmail}</p>
          <p className="text-4">{userRole}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>
  )
}

const Navbar = () => {
  const activeStyle = "bg-amarillo text-white rounded-r-full w-60 h-8"; // Fondo de color verde (#d2de38)
  
return (
<nav className="fixed left-0 mt-0 w-72 h-[90%] shadow-xl space-y-12">
    <ul>
      <li className="mt-12">
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
  
);
};

export { Navbar };
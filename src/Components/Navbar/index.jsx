import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>Inicio</NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink to='/constancias'>Constancias</NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink to='/certificados'>Certificados</NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink to='/rendimientos'>Rendimientos</NavLink>
                </li>
            </ul>

            
        </nav>
    )
}

export { Navbar }
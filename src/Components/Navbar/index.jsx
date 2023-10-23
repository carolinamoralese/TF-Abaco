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
                    <NavLink to='/records'>Constancias</NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink to='/certificates'>Certificados</NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <NavLink to='/i'>Rendimientos</NavLink>
                </li>
            </ul>

            
        </nav>
    )
}

export { Navbar }
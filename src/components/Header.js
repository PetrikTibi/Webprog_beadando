import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <nav className="horizontal-menu">
            <NavLink to="/" exact activeClassName="active">Főoldal</NavLink>
            <NavLink to="/table" activeClassName="active">Táblázat</NavLink>
            <NavLink to="/html5" activeClassName="active">HTML5</NavLink>
        </nav>
    );
}
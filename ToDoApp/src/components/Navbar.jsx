import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth(); 

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/">TodoApp</Link>
            </div>
            
            <div className="nav-links">
                {user ? (
                    <>
                        <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Connexion</Link>
                        <Link to="/register">Inscription</Link>
                    </>
                )}
            </div>
        </nav>
    );        
}

export default Navbar;
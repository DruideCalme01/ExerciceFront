import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth(); 


    const handleLogout = () => {
    console.log("Déconnexion en cours...");
    logout();
    navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/">Acceuil</Link>
            
                {user ? (
                    <>
                        <Link to="/my-articles">Mes Articles</Link>
                        <Link to="/create-article">Créer Article</Link>
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
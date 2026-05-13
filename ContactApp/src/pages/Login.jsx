import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // On réinitialise l'erreur à chaque tentative
    
    try {
      await login(email, password);
      navigate("/"); // Si ça marche, on va sur la liste des contacts
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        
        {error && <p className="error-message">{error}</p>}

        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit" className="btn-auth">Se connecter</button>
        
        <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
          Pas encore de compte ? <Link to="/register" style={{ color: '#646cff' }}>S'inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
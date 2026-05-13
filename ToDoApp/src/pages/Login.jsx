import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    
    try {
      await login(email, password);
      navigate("/"); 
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="container">
      <form className="contact-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="btn-submit">Se connecter</button>
        
        <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
          Pas encore de compte ? <Link to="/register" style={{ color: '#646cff' }}>S'inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
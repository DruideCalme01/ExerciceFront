import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Petite vérification de sécurité avant d'envoyer au serveur
    if (password !== confirmPassword) {
      return setError("Les mots de passe ne correspondent pas");
    }
    
    try {
      await register(email, password);
      // On redirige vers le login avec un petit message de succès (optionnel)
      alert("Compte créé avec succès ! Connectez-vous.");
      navigate("/login");
    } catch (err) {
      setError("Erreur lors de l'inscription. L'email est peut-être déjà utilisé.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        
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

        <input 
          type="password" 
          placeholder="Confirmer le mot de passe" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />

        <button type="submit" className="btn-auth">Créer mon compte</button>
        
        <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>
          Déjà un compte ? <Link to="/login" style={{ color: '#646cff' }}>Se connecter</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
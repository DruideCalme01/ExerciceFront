import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      alert("Inscription réussie ! Connectez-vous maintenant.");
      navigate('/login');
    } catch (err) {
      alert("Erreur d'inscription : " + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input 
          type="email" 
          placeholder="Votre adresse email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Votre mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="btn-submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
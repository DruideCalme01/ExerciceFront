import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom' 
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'
import { api } from './lib/api';
import Register from './pages/Register';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';


function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const navigate = useNavigate();
  
  const { user, logout } = useAuth();

  const handleAddContact = async (newContact) => {
    const createdContact = await api.post('/contacts', newContact)
    setContacts([...contacts, createdContact]);
    navigate("/");
  }

  const handleDeleteContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  const handleUpdateContact = async (id, updatedContact) => {
    const response = await api.put(`/contacts/${id}`, updatedContact)
    setContacts(contacts.map(contact => contact.id === id ? response : contact));
    setEditingContact(null);
    navigate("/"); 
  }

  const searchConcats = (Array.isArray(contacts))
    ? contacts.filter(contact => 
      contact.prenom.toLowerCase().includes(searchTerm.toLowerCase()) || 
      contact.nom.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  const triContact = [...searchConcats].sort((a, b) => a.nom.localeCompare(b.nom));

  useEffect(() => {
    if (user) {
      api.get('/contacts').then(setContacts);
    }
  }, [user]); 

  return ( 
    <div className="container">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-link">Mes Contacts</Link>
          {user && (
            <Link to="/formulaire" className="nav-link" onClick={() => setEditingContact(null)}>
              Ajouter
            </Link>
          )}
        </div>

        <div className="nav-auth">
          {user ? (
            <>
              <button className="btn-logout" onClick={logout}>Déconnexion</button>
            </>
            
          ) : (
            <Link to="/login" className="nav-link">Connexion</Link>
          )}
        </div>
      </nav>

      <h1>Gestionnaire de Contacts</h1>
      <div className="user-email">{user?.email}</div>

      <Routes>
        {/* ROUTE PUBLIQUE */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ROUTES PROTÉGÉES */}
        <Route path="/" element={
          <ProtectedRoute>
            <input 
              className="search-bar" 
              type="text" 
              placeholder="Rechercher un contact..." 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ContactList 
              contacts={triContact} 
              onDelete={handleDeleteContact} 
              onUpdate={(contact) => {
                setEditingContact(contact);
                navigate("/formulaire"); 
              }}
            />
          </ProtectedRoute>
        } />

        <Route path="/formulaire" element={
          <ProtectedRoute>
            <ContactForm 
              AddContact={handleAddContact} 
              UpdateContact={handleUpdateContact} 
              editingContact={editingContact} 
              setEditingContact={setEditingContact} 
            />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App;
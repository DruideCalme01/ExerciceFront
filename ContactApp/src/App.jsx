import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom' 
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'
import { api } from './lib/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const navigate = useNavigate();

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

  const searchConcats = contacts.filter(contact => 
    contact.prenom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    contact.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const triContact = [...searchConcats].sort((a, b) => a.nom.localeCompare(b.nom));


  useEffect(() => {
    api.get('/contacts').then(setContacts);
  }, []);

  return ( 
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="nav-link">Liste de Contacts</Link>
        <Link to="/formulaire" className="nav-link" onClick={() => setEditingContact(null)}>Ajouter Contact</Link>
      </nav>

      <h1>Gestionnaire de Contacts</h1>

      <Routes>
        {/* PAGE ACCUEIL */}
        <Route path="/" element={
          <>
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
          </>
        } />

        {/* PAGE FORMULAIRE */}
        <Route path="/formulaire" element={
          <ContactForm 
            AddContact={handleAddContact} 
            UpdateContact={handleUpdateContact} 
            editingContact={editingContact} 
            setEditingContact={setEditingContact} 
          />
        } />
      </Routes>
    </div>
  )

}

export default App

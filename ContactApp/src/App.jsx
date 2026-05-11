import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'
import { api } from './lib/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { ...newContact, id: Date.now() }]);
  }

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  const searchConcats = contacts.filter(contact => contact.prenom.toLowerCase().includes(searchTerm.toLowerCase()))
  || contacts.filter(contact => contact.nom.toLowerCase().includes(searchTerm.toLowerCase()));

  const triContact = [...searchConcats].sort((a, b) => a.nom.localeCompare(b.nom));

  useEffect(() => {
    api.get('/contacts').then(setContacts);
  }, []);

  return ( 
    <div>
      <h1>Gestionnaire de Contacts</h1>
      <ContactForm AddContact={handleAddContact} />
      <input className="search-bar" type="text" placeholder="Rechercher un contact..." onChange={(e) => setSearchTerm(e.target.value)}/>
      <ContactList contacts={triContact} onDelete={handleDeleteContact} />
    </div>
  )

}

export default App

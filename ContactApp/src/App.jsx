import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import './App.css'
import { api } from './lib/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingContact, setEditingContact] = useState(null);

  const handleAddContact = async (newContact) => {
    const createdContact = await api.post('/contacts', newContact)
    setContacts([...contacts, createdContact]);
  }

  const handleDeleteContact = async (id) => {
    const deletedContacts = await api.delete(`/contacts/${id}`);
    setContacts(contacts.filter(contact => contact.id !== id));
  }

  const handleUpdateContact = async (id, updatedContact) => {
    const updatedContacts = await api.put(`/contacts/${id}`, updatedContact)
    setContacts(contacts.map(contact => contact.id === id ? { ...contact, ...updatedContacts } : contact));
    setEditingContact(null);
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
      <ContactForm AddContact={handleAddContact} UpdateContact={handleUpdateContact} editingContact={editingContact} setEditingContact={setEditingContact} />
      <input className="search-bar" type="text" placeholder="Rechercher un contact..." onChange={(e) => setSearchTerm(e.target.value)}/>
      <ContactList contacts={triContact} onDelete={handleDeleteContact} onUpdate={(contact) => setEditingContact(contact)}/>
    </div>
  )

}

export default App

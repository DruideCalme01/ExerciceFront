import { useEffect, useState } from "react";

function ContactForm({ AddContact, UpdateContact, editingContact, setEditingContact }) {
    const [Data, setData] = useState({
        prenom: '',
        nom: '',
        email: '',
        tel: ''
    });

    useEffect(() => {
        if (editingContact) {
            setData(editingContact);
        }else {
            setData({
                prenom: '',
                nom: '',
                email: '',
                tel: ''
            });
        }
    }, [editingContact]);

    const handleChange = (e) => {const { name, value } = e.target; setData({ ...Data, [name]: value })};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingContact) {      
            UpdateContact(editingContact.id, Data);
        } else {
            AddContact(Data);
        }
        setData({
            prenom: '',
            nom: '',
            email: '',
            tel: ''
        });
        setEditingContact(null);
    };

    return (
    <form onSubmit={handleSubmit} className="contact-form">
        <input 
            name="prenom" 
            className="input-field" 
            placeholder="Prénom" 
            value={Data.prenom} 
            onChange={handleChange} 
            required 
        />
        <input 
            name="nom" 
            className="input-field" 
            placeholder="Nom" 
            value={Data.nom} 
            onChange={handleChange} 
            required 
        />
        <input 
            name="email" 
            type="email"
            className="input-field" 
            placeholder="Email" 
            value={Data.email} 
            onChange={handleChange} 
            required
        />
        <input 
            name="tel" 
            type="tel"
            className="input-field" 
            placeholder="Téléphone" 
            value={Data.tel} 
            onChange={handleChange} 
            required
        />
        <button type="submit" className="btn-submit">
            {editingContact ? 'Enregistrer' : 'Ajouter contact'}
        </button>
    </form>
);
}

export default ContactForm;
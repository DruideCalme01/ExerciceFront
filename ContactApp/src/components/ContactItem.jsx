function ContactItem({ contact, onDelete }) {
  return (
    <div className="contact-item">
        <h3>Contact : {contact.prenom} {contact.nom.toUpperCase()}</h3>
        <p>Email : {contact.email}</p>
        <p>Téléphone : {contact.tel}</p>
        
        <div className="btn-group">
            <button className="btn-action btn-edit" onClick={() => alert('Bientôt !')}>
                Modifier
            </button>
            <button className="btn-action btn-delete" onClick={() => onDelete(contact.id)}>
                Supprimer
            </button>
        </div>
    </div>
);
}

export default ContactItem;
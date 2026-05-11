import ContactItem from "./ContactItem";

function ContactList({ contacts, onDelete, onUpdate }) {
    if (contacts.length === 0) return <p className="no-contact">Aucun contact trouvé.</p>;
    return (
    <div className="contact-list-container">
        {contacts.map(contact => (
            <ContactItem key={contact.id} contact={contact} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
    </div>
    );
}

export default ContactList;
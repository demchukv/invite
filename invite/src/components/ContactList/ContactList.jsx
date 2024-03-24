import { useSelector } from 'react-redux';
import { selectVisibleContacts } from '../../redux/contacts/selectors';
import Contact from "../Contact/Contact";

const ContactList = () => {

  const contacts = useSelector(selectVisibleContacts);

  return (
    Array.isArray(contacts) &&
    <ul>
        {contacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} />
        })}
    </ul>
  )

}

export default ContactList;
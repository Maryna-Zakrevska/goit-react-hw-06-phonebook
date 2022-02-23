import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/ContactForm";
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";
import { PhonebookMainTitleStyled, PhonebookTitleStyled } from "./App.styled";
import { saveContacts, loadContacts } from "Utils/localStorage";

import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  deleteContact,
  setFromLocalStorageContacts,
  setFilterToRedux,
} from "./redux/store";

const LS_KEY = "saved-phonebook-contacts";

export default function App() {
  const dispatch = useDispatch();
  const storedFilter = useSelector((state) => state.contacts.filter);
  const contacts = useSelector((state) => state.contacts.items);

  /* const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
 */

  useEffect(() => {
    const localSavedContacts = loadContacts(LS_KEY);
    if (localSavedContacts?.length > 0) {
      dispatch({
        type: setFromLocalStorageContacts.type,
        payload: localSavedContacts,
      });
      /* setContacts(localSavedContacts); */
    }
  }, [dispatch]);

  useEffect(() => {
    saveContacts(LS_KEY, contacts?.length > 0 ? contacts : []);
  }, [contacts]);

  const onChangeFilter = (e) => {
    const currentFilterText = e.currentTarget.value;
    /* setFilter(e.currentTarget.value); */
    dispatch({
      type: setFilterToRedux.type,
      payload: currentFilterText,
    });
  };

  const getVisibleContacts = () => {
    const normalizedFilter = storedFilter.toLowerCase();
    return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const isSaved = (newName) => {
    const contact = contacts.find(({ name }) => name.toLowerCase() === newName.toLowerCase());
    if (contact) {
      alert(`${contact.name} is already in the contacts`);
    } else {
      return true;
    }
  };

  const onAddContactSubmit = ({ name, number }) => {
    if (!isSaved(name)) return;
    const contact = { id: nanoid(), name, number };
    /* setContacts((prevState) => [contact, ...prevState]); */
    dispatch({ type: addContact.type, payload: contact });
  };

  const onDeleteContact = (contactId) => {
    dispatch({ type: deleteContact.type, payload: contactId });
  };
  /* setContacts((prevContacts) => {
      return prevContacts.filter(({ id }) => id !== contactId);
    }); */

  const filteredContacts = getVisibleContacts();

  return (
    <div>
      <div>
        <PhonebookMainTitleStyled>Phonebook</PhonebookMainTitleStyled>
        <ContactForm onSubmit={onAddContactSubmit} />
      </div>
      <PhonebookTitleStyled>Contacts</PhonebookTitleStyled>
      <Filter onChange={onChangeFilter} />
      <ContactList contacts={filteredContacts} onDeleteContact={onDeleteContact} />
    </div>
  );
}

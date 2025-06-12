import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact, deleteContact } from '../../redux/contacts/operations';
import { selectContacts, selectContactsLoading } from '../../redux/contacts/selectors';
import { selectFilter } from '../../redux/filters/selectors';
import { setFilter } from '../../redux/filters/filtersSlice';
import ContactList from '../../components/ContactList/ContactList';
import Filter from '../../components/Filter/Filter';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';
import toast from 'react-hot-toast';
import styles from './ContactsPage.module.css';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectContactsLoading);
  const filter = useSelector(selectFilter);
  const [modal, setModal] = useState({ show: false, id: null });

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .catch(() => toast.error('Failed to fetch contacts'));
  }, [dispatch]);

  const handleAdd = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    dispatch(addContact({ name, phone }))
      .unwrap()
      .then(() => {
        toast.success('Contact added');
        e.target.reset();
      })
      .catch(() => toast.error('Failed to add'));
  };

  const handleDelete = id => {
    setModal({ show: true, id });
  };

  const confirmDelete = () => {
    dispatch(deleteContact(modal.id))
      .unwrap()
      .then(() => toast.success('Deleted'))
      .catch(() => toast.error('Failed delete'));
    setModal({ show: false, id: null });
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.phone.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>Contacts</h2>
      <form onSubmit={handleAdd} className={styles.form}>
        <input name="name" placeholder="Name" required />
        <input name="phone" placeholder="Phone" required />
        <button type="submit">Add</button>
      </form>

      <Filter value={filter} onChange={e => dispatch(setFilter(e.target.value))} />

      {isLoading ? <p>Loading...</p> : (
        <ContactList items={filtered} onDelete={handleDelete} />
      )}

      {modal.show && (
        <ModalConfirm
          onConfirm={confirmDelete}
          onCancel={() => setModal({ show: false, id: null })}
        />
      )}
    </div>
  );
}

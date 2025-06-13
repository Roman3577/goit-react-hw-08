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
  const contacts = useSelector(selectContacts) || []; // захист від null
  const isLoading = useSelector(selectContactsLoading);
  const filter = useSelector(selectFilter) || ''; // захист від undefined
  const [modal, setModal] = useState({ show: false, id: null });

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .catch(() => toast.error('Не вдалося отримати контакти'));
  }, [dispatch]);

  const handleAdd = e => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const phone = e.target.phone.value.trim();

    if (!name || !phone) {
      toast.error('Заповніть усі поля');
      return;
    }

    dispatch(addContact({ name, phone }))
      .unwrap()
      .then(() => {
        toast.success('Контакт додано');
        e.target.reset();
      })
      .catch(() => toast.error('Не вдалося додати контакт'));
  };

  const handleDelete = id => {
    setModal({ show: true, id });
  };

  const confirmDelete = () => {
    dispatch(deleteContact(modal.id))
      .unwrap()
      .then(() => toast.success('Контакт видалено'))
      .catch(() => toast.error('Помилка видалення'));
    setModal({ show: false, id: null });
  };

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.phone.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>Контакти</h2>
      <form onSubmit={handleAdd} className={styles.form}>
        <input name="name" placeholder="Імʼя" required />
        <input name="phone" placeholder="Телефон" required />
        <button type="submit">Додати</button>
      </form>

      <Filter value={filter} onChange={e => dispatch(setFilter(e.target.value))} />

      {isLoading ? <p>Завантаження...</p> : (
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

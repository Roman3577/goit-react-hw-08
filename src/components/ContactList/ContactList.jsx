import React from 'react';
import ContactItem from '../ContactItem/ContactItem';

export default function ContactList({ items, onDelete }) {
  return (
    <ul>
      {items.map(c => (
        <ContactItem key={c.id} contact={c} onDelete={onDelete} />
      ))}
    </ul>
  );
}

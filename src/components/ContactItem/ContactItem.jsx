import React from 'react';
import styles from './ContactItem.module.css';

export default function ContactItem({ contact: { id, name, phone }, onDelete }) {
  return (
    <li className={styles.item}>
      <span>{name}: {phone}</span>
      <button onClick={() => onDelete(id)} className={styles.button}>Delete</button>
    </li>
  );
}

import React from 'react';
import styles from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <div className={styles.filter}>
      <label>Filter Contacts
        <input type="text" value={value} onChange={onChange} />
      </label>
    </div>
  );
}

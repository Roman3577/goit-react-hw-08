import React from 'react';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.home}>
      <h1>Welcome to Contacts App</h1>
      <p>Manage your private address book easily!</p>
    </div>
  );
}

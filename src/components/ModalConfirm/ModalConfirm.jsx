import React from 'react';
import styles from './ModalConfirm.module.css';

export default function ModalConfirm({ onConfirm, onCancel }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Are you sure?</p>
        <div className={styles.controls}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

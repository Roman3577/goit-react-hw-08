import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';

const initialValues = { email: '', password: '' };
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Min 6 chars').required('Required'),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <h2>Логін</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        <Form className={styles.form}>
          <label>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className={styles.error} />
          </label>
          <label>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className={styles.error} />
          </label>
          <button type="submit">Увійти</button>
        </Form>
      </Formik>
    </div>
  );
}

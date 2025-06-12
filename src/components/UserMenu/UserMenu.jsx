import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);

  return (
    <div className={styles.menu}>
      <p className={styles.name}>Welcome, {name}</p>
      <button onClick={() => dispatch(logout())} className={styles.button}>
        Logout
      </button>
    </div>
  );
}

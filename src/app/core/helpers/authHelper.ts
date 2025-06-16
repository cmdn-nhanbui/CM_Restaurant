import { logout } from '../services/auth.service';
import { KEYS, removeLS } from './storageHelper';

export const handleLogout = async () => {
  logout();
  removeLS(KEYS.ACCESS_TOKEN);
  removeLS(KEYS.REFRESH_TOKEN);
  window.location.replace('/');
};

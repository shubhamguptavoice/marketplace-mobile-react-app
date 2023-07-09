// project import
import other from './other';
import pages from './pages';

// types
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //
const role = localStorage.getItem('role_id');
const menuItems: { items: NavItemType[] } = {
    items: [pages, other]
};

export default menuItems;

import {
  ApertureIcon,
  CopyIcon,
  LayoutDashboardIcon,
  LoginIcon,
  MoodHappyIcon,
  TypographyIcon,
  UserPlusIcon,
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  divider?: boolean;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    title: 'Home',
    icon: LayoutDashboardIcon,
    to: '/',
  },
  { divider: true },
  { header: 'auth' },
  {
    title: 'Login',
    icon: LoginIcon,
    to: '/guest/login',
  },
  {
    title: 'Register',
    icon: UserPlusIcon,
    to: '/guest/register',
  },
  { divider: true },
  { header: 'Extra' },
  {
    title: 'Sample Page',
    icon: ApertureIcon,
    to: '/guest/sample-page',
  },
];

export default sidebarItem;

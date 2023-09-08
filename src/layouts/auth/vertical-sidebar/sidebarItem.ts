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
  { header: 'Home' },
  {
    title: 'Dashboard',
    icon: LayoutDashboardIcon,
    to: '/',
  },
  { header: 'Requests' },
  {
    title: 'Requests List',
    icon: CopyIcon,
    to: '/requests',
  },
  { header: 'Management' },
  {
    title: 'Countries',
    icon: ApertureIcon,
    to: '/countries',
  },
  {
    title: 'Currencies',
    icon: ApertureIcon,
    to: '/currencies',
  },
  {
    title: 'Disciplines',
    icon: ApertureIcon,
    to: '/disciplines',
  },
  {
    title: 'Work Disciplines',
    icon: ApertureIcon,
    to: '/work-disciplines',
  },
  {
    title: 'Organizations',
    icon: ApertureIcon,
    to: '/organizations',
  },
  {
    title: 'Projects',
    icon: ApertureIcon,
    to: '/projects',
  },
  {
    title: 'Offer Scopes',
    icon: ApertureIcon,
    to: '/offer-scopes',
  },
  {
    title: 'BOQ Templates',
    icon: ApertureIcon,
    to: '/boq-templates',
  },
  { header: 'utilities' },
  {
    title: 'Typography',
    icon: TypographyIcon,
    to: '/ui/typography',
  },
  {
    title: 'Shadow',
    icon: CopyIcon,
    to: '/ui/shadow',
  },
  { header: 'Extra' },
  {
    title: 'Icons',
    icon: MoodHappyIcon,
    to: '/icons',
  },
  {
    title: 'Sample Page',
    icon: ApertureIcon,
    to: '/sample-page',
  },
];

export default sidebarItem;

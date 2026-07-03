import type { IconProps } from '@bearnance/ui-web/components/Icon';

export type NavLink = {
  href: string;
  iconName: IconProps['name'];
  label: string;
};

export const navLinks: NavLink[] = [
  { href: '/', iconName: 'bearnance-house', label: 'Overview' },
  {
    href: '/transactions',
    iconName: 'bearnance-arrows-down-up',
    label: 'Transactions',
  },
  { href: '/budgets', iconName: 'bearnance-chart-donut', label: 'Budgets' },
  { href: '/pots', iconName: 'bearnance-jar-fill', label: 'Pots' },
  {
    href: '/recurring-bills',
    iconName: 'bearnance-receipt',
    label: 'Recurring bills',
  },
  { href: '/?logged-in=false', iconName: 'log-out', label: 'Log out' },
];

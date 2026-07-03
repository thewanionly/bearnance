import { BottomNavLinks } from './BottomNavLinks';

export const BottomNav = () => {
  return (
    <nav
      className="bg-grey-900 fixed bottom-0 w-full rounded-t-lg px-4 pt-2 md:px-8 lg:hidden"
      aria-label="primary"
    >
      <ul className="text-grey-300 flex justify-between">
        <BottomNavLinks />
      </ul>
    </nav>
  );
};

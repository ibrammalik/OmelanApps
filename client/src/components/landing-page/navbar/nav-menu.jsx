import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { NavLink, useLocation } from 'react-router-dom';

const navs = [
  {
    text: 'Beranda',
    link: '/',
  },
  {
    text: 'Pesan',
    link: '/pesan',
  },
  {
    text: 'Caregiver',
    link: '/caregivers',
  },
  {
    text: 'Dashboard',
    link: '/dashboard',
  },
];

export function NavMenu() {
  const location = useLocation();

  useScrollToTop(location);

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-6">
        {navs.map((nav, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink>
              <NavLink
                to={nav.link}
                className={({ isActive }) => (isActive ? 'text-primary font-semibold' : '')}>
                {nav.text}
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

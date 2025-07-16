import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const navs = [
  {
    text: "Fitur",
    link: "/#fitur"
  },
  {
    text: "FAQ",
    link: "/#faq"
  },
]

export const NavMenu = (props) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {navs.map((nav, i) => {
        return (
          <NavigationMenuItem key={i}>
            <NavigationMenuLink asChild>
              <a href={nav.link}>{nav.text}</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )
      })}
    </NavigationMenuList>
  </NavigationMenu>
);

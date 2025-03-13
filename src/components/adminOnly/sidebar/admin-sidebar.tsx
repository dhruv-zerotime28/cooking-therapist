import Link from 'next/link';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Salad, Tags, Home, Inbox, Search, Settings , Moon , Sun} from 'lucide-react';
import { ItemText } from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme/mode-toggle';

const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Tags',
    url: '/dashboard/tags',
    icon: Tags,
  },
  {
    title: 'Category',
    url: '/dashboard/category',
    icon: Tags,
  },
  {
    title: 'Recipes',
    url: '/dashboard/recipeLists',
    icon: Salad,
  },
  {
    title: 'Contact',
    url: '/dashboard/contact',
    icon: Inbox,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];
export function AdminSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className=''>
        <img src="/logo.svg" alt="" className='bg-neutral-800'/>
      </SidebarHeader>
      <SidebarContent className='p-4'>
        <SidebarGroup />
        <div className="list-none p-0 m-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className='my-5 font-bold'>
              <SidebarMenuButton asChild className="p-5">
                <Link href={`/admin${item.url}`}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className='p-4'>
        <ModeToggle/>
        <Button>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
}

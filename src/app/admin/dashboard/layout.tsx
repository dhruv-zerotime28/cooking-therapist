'use client';
import '../../globals.css';
// import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AdminSideBar } from '@/components/adminOnly/dashboard-common/sidebar/admin-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { NavAdmin } from '@/components/adminOnly/dashboard-common/header/admin-profile';

const user = {
  name : "aamir",
  email : "am@gmail.com",
}
export default function dashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 
  const lastSegment = pathname.split('/').filter(Boolean).pop();

  return (
          <SidebarProvider>
            <AdminSideBar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className='flex justify-between w-full'>
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1"/>
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="/admin/dashboard">
                          dashboard
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {lastSegment === 'dashboard' ? '' : lastSegment}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className='p-1 mx-4'>
                <NavAdmin user={user}/>
                </div>
                </div>
              </header>
              <main className="w-full">{children}</main>
            </SidebarInset>
          </SidebarProvider>
  );
}

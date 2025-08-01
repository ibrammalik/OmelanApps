import React, { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Outlet } from 'react-router-dom';
import { getUnreadNotifications } from '@/utils/api';
import NotificationButton from '@/components/notification/NotificationButton';
import NotificationSidebar from '@/components/notification/NotificationSidebar';
('react-router-dom');

export default function Dashboard() {
  const [role, setRole] = useState(null);
  const [activeLabel, setActiveLabel] = useState('Beranda');

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('accessToken');

    if (!userRole || !token) {
      window.location.href = '/login';
    } else {
      setRole(userRole); // role: "caregiver" / "caretaker"
    }
  }, []);

  // useEffect(() => {
  //   const userRole = localStorage.getItem("userRole");
  //   setRole(userRole);
  // }, []);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnread = async (type) => {
    const unread = await getUnreadNotifications(type);
    setUnreadCount(unread.length);
  };

  useEffect(() => {
    if (role) {
      const type = role === 'caregiver' ? 'partner' : 'client';
      fetchUnread(type);
    }
  }, [role, sidebarOpen]);

  if (role === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading Dashboard...</span>
      </div>
    );
  }

  const type = role === 'caregiver' ? 'partner' : 'client';

  return (
    <SidebarProvider>
      <AppSidebar role={role} setActiveLabel={setActiveLabel} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <div className="flex justify-between items-center w-full">
              <span>{activeLabel}</span>
              <NotificationButton unreadCount={unreadCount} onClick={() => setSidebarOpen(true)} />
              <NotificationSidebar
                type={type}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

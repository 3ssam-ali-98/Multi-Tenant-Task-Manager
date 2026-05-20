"use client";

import { useEffect } from "react";

import { useRouter }
from "next/navigation";
import {  BreadcrumbProvider,  } from "@/context/BreadcrumbContext";

import { useAuth }
from "@/hooks/useAuth";
import { AppSidebar } from "@/components/app-sidebar"
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


import { Button } from "@/components/ui/button";
import AppBreadcrumbs from "@/components/navigation/AppBreadcrumbs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const { logout } = useAuth();
  const {isAuthenticated, loading} = useAuth();

  useEffect(() => {

    if (
      !loading &&
      !isAuthenticated
    ) {
      router.push("/login");
    }

  }, [
    isAuthenticated,
    loading,
    router,
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

   return (
    <BreadcrumbProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <AppBreadcrumbs />
          <Button
        variant="destructive"
        onClick={logout}
        className="ml-auto" 
      >
        Logout
      </Button>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </BreadcrumbProvider>
  );
}


{/* <Breadcrumb>

  <BreadcrumbList>

    <BreadcrumbItem>
      <BreadcrumbLink href="/organizations">
        Organizations
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbLink
        href={`/organizations/${organizationId}`}
      >
        {organizationName}
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbLink
        href={`/organizations/${organizationId}/tasks`}
      >
        Tasks
      </BreadcrumbLink>
    </BreadcrumbItem>

    <BreadcrumbSeparator />

    <BreadcrumbItem>
      <BreadcrumbPage>
        {taskName}
      </BreadcrumbPage>
    </BreadcrumbItem>

  </BreadcrumbList>

</Breadcrumb> */}
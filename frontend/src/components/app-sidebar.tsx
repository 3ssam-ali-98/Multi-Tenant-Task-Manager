"use client"

import * as React from "react"

import Link from "next/link";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, LayoutBottomIcon } from "@hugeicons/core-free-icons"
import { useRouter } from "next/navigation";

import { getSelectedOrganization, setSelectedOrganization } from "@/lib/organizationStorage";
import { useEffect, useState } from "react";
import { Organization } from "@/types/organization";
import { getOrganizations } from "@/services/organizationService";

// This is sample data.



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  
  
      useEffect(() => {
          async function fetchOrganizations() {
              try {
                  const data = await getOrganizations();
                  setOrganizations(data);
              } catch (error) {
                  if (error instanceof Error) {
                      console.error("Error fetching organizations:", error.message);}
              }
          }
  
          fetchOrganizations();
      }, []);

  function handleTasksNavigation() {

  const organization =    getSelectedOrganization();

  if (organization.id) {

    router.push(
      `/organizations/${organization.id}/tasks`
    );

  } else if (organizations.length === 1) {

    router.push(`/organizations/${organizations[0].id}/tasks`);
    setSelectedOrganization(
          organizations[0].id,
          organizations[0].name
        );

  }else {

        router.push("/select-organization/tasks");

  }
}

function handleMembershipsNavigation() {

  const organization =
    getSelectedOrganization();

  if (organization.id) {

    router.push(
      `/organizations/${organization.id}/memberships`
    );

  } else if (organizations.length === 1) {

    router.push(`/organizations/${organizations[0].id}/memberships`);
    setSelectedOrganization(
          organizations[0].id,
          organizations[0].name
        );

  }else {

        router.push("/select-organization/memberships");

  }
}
const data = {
  navMain: [
    // {
    //   title: "Getting Started",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Create Organization",
    //       url: "#",
    //       type: "link",
    //     },
    //   ],
    // },
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          type: "link",
        },
        {
          title: "Organizations",
          url: "/organizations",
          type: "link",
        },
        {
          title: "Memberships",
          url: "#",
          type: "button",
          onClick: handleMembershipsNavigation,
        },
        {
          title: "Tasks",
          url: "#",
          type: "button",
          onClick: handleTasksNavigation,
        }
      ],
    },
    
  ],
}
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium hover:bg-sidebar-primary/50" href="/">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <HugeiconsIcon icon={LayoutBottomIcon} strokeWidth={2} className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">MTTM</span>
              </div>
          </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild >
                          {item.type === "link" ? (
                            <Link href={item.url}>{item.title}</Link>
                          ) : (
                            <button className="cursor-pointer" onClick={item.onClick} >{item.title}</button>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

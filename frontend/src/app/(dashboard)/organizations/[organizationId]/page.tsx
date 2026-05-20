"use client";

import { useParams } from "next/navigation";
import {  useEffect,} from "react";

import {  useBreadcrumbs,} from "@/context/BreadcrumbContext";
import {  useOrganization } from "@/hooks/organizationHooks";
import EditOrganizationDialog from "@/components/organizations/EditOrganizationDialog";
import DeleteOrganizationDialog from "@/components/organizations/DeleteOrganizationDialog";
import { canEditOrganization } from "@/lib/permissions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";
import { Card } from "@/components/ui/card";
export default function

OrganizationDetailsPage() {

  const params = useParams();
  const router = useRouter();
  const { setItems } =  useBreadcrumbs();
  const organizationId = Number(params.organizationId);

  

  const {
    organization,
    loading,
    error,
  } = useOrganization(organizationId);

  useEffect(() => {

  if (!organization) return;

  setItems([
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Organizations",
      href: "/organizations",
    },
    {
      label: organization.name,
    },
  ]);

}, [organization, setItems]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !organization) {
    return (
      <p>
        Failed to load organization
      </p>
    );
  }

  

  return (

    <div className="flex flex-col gap-4 p-4 min-h-full ">

      <h1 className="text-xl md:text-2xl font-bold text-center px-4">
        This is organization ({organization.name}) page, where you can manage your organization details, members, and tasks.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full mt-6">
        
        <Card className="w-full flex flex-col h-full">
            <Link href={`/organizations/${organization.id}/memberships`} className="w-full h-full block p-3">
                <h5 className="mb-4 text-2xl font-semibold tracking-tight text-heading leading-8 text-center">
                Manage Members
                </h5>
                <hr className="border-t border-gray-200 my-4" />
                <p className="text-center text-lg text-muted-foreground">
                Manage your organization&apos;s members and their roles.
                </p>
            </Link>
        </Card>
    

        <Card className="w-full flex flex-col h-full">
            <Link href={`/organizations/${organization.id}/tasks`} className="w-full h-full block p-3">
                <h5 className="mb-4 text-2xl font-semibold tracking-tight text-heading leading-8 text-center">
                Manage Tasks
                </h5>
                <hr className="border-t border-gray-200 my-4" />
                <p className="text-center text-lg text-muted-foreground">
                Manage your organization&apos;s tasks, assignments and their status.
                </p>
            </Link>
        </Card>

      </div>
      <div className="flex justify-around mt-auto mb-6 pb-6">
        {canEditOrganization(organization) && (<EditOrganizationDialog organization={organization}/>)}
        <Button  className="inline-flex cursor-pointer items-center text-white bg-blue-700 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={() => router.push(`/organizations/`)}>
                   
            <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4 4m-4-4l4-4"/></svg>
                Go Back
        </Button>
        {canEditOrganization(organization) && (<DeleteOrganizationDialog organizationId={organization.id} organizationName={organization.name}/>)}
      </div>
    </div>
  );
}
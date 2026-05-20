"use client";



import CreateOrganizationDialog from "@/components/organizations/CreateOrganizationDialog";
import { Organization } from "@/types/organization";
import { Button } from "@/components/ui/button";
import {setSelectedOrganization} from "@/lib/organizationStorage";
import { useRouter } from "next/dist/client/components/navigation";
import {  useOrganizations } from "@/hooks/organizationHooks";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { useEffect } from "react";

export default function
OrganizationsPage() {

  const router = useRouter();
  const { setItems } =  useBreadcrumbs();

  const {
    organizations,
    loading,
    error,
    refetch,
  } = useOrganizations();

  useEffect(() => {
    
    
      setItems([
        {
          label: "Dashboard",
          href: "/dashboard",
        },
        {
          label: "Organizations",
          href: "/organizations",
        },
      ]);
    
    }, [setItems]);

  function handleOrganizationClick(
    organization: Organization
  ) {

    setSelectedOrganization(
      organization.id,
      organization.name
    );

    router.push(
      `/organizations/${organization.id}`
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {error}
      </p>
    );
  }


  return (

    <div>

        <main className="p-4">
          <h1 className="text-2xl flex items-center justify-center font-bold mb-4 ">Organizations You are part of</h1>
          {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {organizations.map((organization) => (

            <div className="block max-w-sm p-6 border rounded-xl shadow-sm" key={organization.id}>
                <h5 className="mb-3 flex items-center justify-center text-2xl font-semibold tracking-tight text-heading leading-8">{organization.name}</h5>
                <p className="text-body mb-6">Owner: {organization.owner}</p>
                <p className="text-body mb-6">Created: {organization.created_at}</p>
                <div className="flex items-center justify-center">
                <Button  className="inline-flex cursor-pointer items-center text-white bg-black box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={() => handleOrganizationClick(organization)}>
                    Manage
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </Button>
                </div>
            </div>
            ))}
            </div>
            <div className="flex items-center justify-center mt-6">
             <CreateOrganizationDialog onCreated={refetch}/>
            </div>
        </main>

    </div>
  );
}



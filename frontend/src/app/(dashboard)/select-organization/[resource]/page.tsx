"use client";

import { useRouter }
from "next/navigation";

import { useParams }
from "next/navigation";

import {
  setSelectedOrganization
}
from "@/lib/organizationStorage";
import { useEffect, useState } from "react";
import { Organization } from "@/types/organization";
import { getOrganizations } from "@/services/organizationService";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";

export default function SelectOrganizationPage() {

  const router = useRouter();
  const [error, setError] = useState("")
  const { setItems } =  useBreadcrumbs();
  
  const params = useParams();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  
  const resource =  params.resource;
  

  useEffect(() => {
          async function fetchOrganizations() {
              setError("")
              try {
                  const data = await getOrganizations();
                  setOrganizations(data);
              } catch (error) {
                  if (error instanceof Error) {
                      setError(error.message);
                  }
              }
          }
  
          fetchOrganizations();

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

  function handleSelectOrganization(
    organizationId: number,
    organizationName: string
  ) {

    setSelectedOrganization(
      organizationId,
      organizationName
    );

    router.push(`/organizations/${organizationId}/${resource}`);
  }

  return (
    <div>

        <main className="p-4">
          <h1 className="text-2xl flex items-center justify-center font-bold mb-4 ">Please Select an Organization</h1>
          {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {organizations.map((org) => (

            <div className="block max-w-sm p-6 border rounded-xl shadow-sm hover:bg-gray-100 cursor-pointer transition-colors" key={org.id} onClick={() => handleSelectOrganization(org.id, org.name)}>
                <h5 className="mb-3 flex items-center justify-center text-2xl mb-6 font-semibold tracking-tight text-heading leading-8">{org.name}</h5>
                <p className="text-body mb-6">Owner: {org.owner}</p>
                <p className="text-body mb-6">Created: {org.created_at}</p>
                <div className="flex items-center justify-center">
                </div>
            </div>
            ))}
            </div>
        </main>

    </div>
  );
}
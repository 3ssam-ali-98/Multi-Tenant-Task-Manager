"use client";


import { useRouter } from "next/dist/client/components/navigation";
import {  useMemberships } from "@/hooks/membershipHooks";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import CreateMembershipDialog from "@/components/memberships/CreateMembershipDialog";
import { useOrganization } from "@/hooks/organizationHooks";
import { canManageMemberships } from "@/lib/permissions";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { useEffect } from "react";


export default function
OrganizationsPage() {

  const router = useRouter();
  const params = useParams();
  const organizationId = Number(params.organizationId);
  const { setItems } =  useBreadcrumbs();
  
  const {organization,  } = useOrganization(organizationId);

  const {
    memberships,
    loading,
    error,
    refetch,
  } = useMemberships(organizationId);

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
        href: `/organizations/${organization.id}`
      },
      {
        label: "Memberships",
        href: `/organizations/${organization.id}/memberships`
      },
    ]);
  
  }, [organization, setItems]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !organization) {
    return (
      <p className="text-red-500">
        {error}
      </p>
    );
  }


  return (

    <div>

        <main className="p-4">
          <h1 className="text-2xl flex items-center justify-center font-bold mb-4 ">{organization.name} members</h1>
          <hr></hr>
          {error && <p className="text-red-500">{error}</p>}
          <h1 className="mt-6 text-xl font-bold">Owner</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 mb-6">
            {memberships.filter((m) => m.is_owner === true).map((membership) => (

            <div className="block max-w-sm p-6 border rounded-xl shadow-sm" key={membership.id}>
                <h5 className="mb-3 flex items-center justify-center text-xl font-semibold tracking-tight text-heading leading-8">Member Full Name: {membership.member_name}</h5>
                <p className="text-body mb-6">Member E-mail: {membership.member_email}</p>
                
                <div className="flex items-center justify-center">
                <Button  className="inline-flex cursor-pointer items-center text-white bg-black box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" 
                onClick={() => router.push(`/organizations/${organizationId}/memberships/${membership.id}`)}>
                    View Details
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </Button>
                </div>
            </div>
            ))}
            
            </div>

            <hr></hr>
            <h1 className="mt-6 text-xl font-bold">Admins</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 mb-6">
            {memberships.filter((m) => m.is_owner === false && m.role === "admin").map((membership) => (

            <div className="block max-w-sm p-6 border rounded-xl shadow-sm" key={membership.id}>
                <h5 className="mb-3 flex items-center justify-center text-xl font-semibold tracking-tight text-heading leading-8">Member Full Name: {membership.member_name}</h5>
                <p className="text-body mb-6">Member E-mail: {membership.member_email}</p>
                
                <div className="flex items-center justify-center">
                <Button  className="inline-flex cursor-pointer items-center text-white bg-black box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" 
                onClick={() => router.push(`/organizations/${organizationId}/memberships/${membership.id}`)}>
                    View Details
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </Button>
                </div>
            </div>
            ))}
            
            </div>

            <hr></hr>
            <h1 className="mt-6 text-xl font-bold">Members</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 mb-6">
            
            {memberships.filter((m) => m.role === "member").map((membership) => (

            <div className="block max-w-sm p-6 border rounded-xl shadow-sm" key={membership.id}>
                <h5 className="mb-3 flex items-center justify-center text-xl font-semibold tracking-tight text-heading leading-8">Member Full Name: {membership.member_name}</h5>
                <p className="text-body mb-6">Member E-mail: {membership.member_email}</p>
                
                <div className="flex items-center justify-center">
                <Button  className="inline-flex cursor-pointer items-center text-white bg-black box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" 
                onClick={() => router.push(`/organizations/${organizationId}/memberships/${membership.id}`)}>
                    View Details
                    <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                </Button>
                </div>
            </div>
            ))}
            
            </div>
            {canManageMemberships(organization) && (<div className="flex items-center justify-center mt-6">
             <CreateMembershipDialog onCreated={refetch}/>
            </div>)}

            <Button  className="inline-flex cursor-pointer items-center text-white bg-blue-700 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={() => router.push(`/organizations/${organizationId}/`)}>
                   
            <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4 4m-4-4l4-4"/></svg>
                Go Back
        </Button>
        </main>

    </div>
  );
}
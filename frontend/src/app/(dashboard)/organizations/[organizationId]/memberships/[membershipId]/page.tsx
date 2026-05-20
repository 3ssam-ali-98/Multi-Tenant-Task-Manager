"use client";

import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";
import { Card } from "@/components/ui/card";
import { useMembership } from "@/hooks/membershipHooks";
import { useOrganization } from "@/hooks/organizationHooks";
import { canManageMemberships } from "@/lib/permissions";
import EditMembershipDialog from "@/components/memberships/EditMembershipDialog";
import DeleteMembershipDialog from "@/components/memberships/DeleteMembershipDialog";
import { ROLE_LABELS } from "@/constants/rolesAndTaskStatus";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { useEffect } from "react";

export default function MembershipDetailsPage() {

  const params = useParams();
  const router = useRouter();
  const { setItems } =  useBreadcrumbs();

  const organizationId = Number(params.organizationId);
  const membershipId = Number(params.membershipId);
  const {organization,  } = useOrganization(organizationId);
  

  const {
    membership,
    loading,
    error,
  } = useMembership(organizationId, membershipId);


  useEffect(() => {
        
          if (!membership || !organization) return;
        
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
            {
              label: membership.member_name,
              href: `/organizations/${organization.id}/Memberships/${membership.id}`
            },
          ]);
        
        }, [organization, membership, setItems]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !membership || !organization) {
    return (
      <p>
        Failed to load membership or organization
      </p>
    );
  }

  return (

    <div className="h-full flex flex-col gap-4 p-4">

      <h1 className="text-xl md:text-2xl font-bold text-center px-4">
        ({membership.member_name}) profile and details
      </h1>

      <div className="flex justify-center mt-4 ">
        
        <Card className="">

            <p className="ml-3 mr-3 text-lg text-foreground">  Member Full Name: {membership.member_name} </p>         
            <p className="ml-3 mr-3 text-lg text-foreground"> Member E-mail: {membership.member_email} </p>
            <p className="ml-3 mr-3 text-lg text-foreground">Organization Name: {organization.name}</p>
            <p className="ml-3 mr-3 text-lg text-foreground">Organization Role: {ROLE_LABELS[membership.role]}</p>

            <div className="flex justify-around m-auto  pb-6">
        {canManageMemberships(organization) && (<EditMembershipDialog organizationId={organizationId} membership={membership}/>)}
        {canManageMemberships(organization) && (<DeleteMembershipDialog organizationId={organizationId} membership={membership}/>)}
      </div>
            
        </Card>

      </div>
      
      <div className="mt-auto">
      <Button  className=" cursor-pointer items-center text-white bg-blue-700 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm focus:outline-none" onClick={() => router.push(`/organizations/${organizationId}/memberships/`)}>
                   
            <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4 4m-4-4l4-4"/></svg>
                Go Back
        </Button>
        </div>
    </div>

    
  );
}
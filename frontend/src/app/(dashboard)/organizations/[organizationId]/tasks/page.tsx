"use client";


import { useRouter } from "next/dist/client/components/navigation";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useOrganization } from "@/hooks/organizationHooks";
import { useTasks } from "@/hooks/taskhooks";
import { TASK_STATUS_LABELS } from "@/constants/rolesAndTaskStatus";
import { useMemberships } from "@/hooks/membershipHooks";
import CreateTaskDialog from "@/components/tasks/CreateTaskDialog";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { useEffect } from "react";



export default function
OrganizationsPage() {

  const router = useRouter();
  const params = useParams();
  const { setItems } =  useBreadcrumbs();
  const organizationId = Number(params.organizationId);
  const {organization  } = useOrganization(organizationId);
  const {memberships, } = useMemberships(organizationId);

  const {
    tasks,
    loading,
    error,
    refetch,
  } = useTasks(organizationId);


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
          label: "Tasks",
          href: `/organizations/${organization.id}/tasks`
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

    const role = organization.current_user_role;

  return (

    <div>
    
            <main className="p-4">
              <h1 className="text-2xl flex items-center justify-center font-bold mb-4">{role === "admin"? `${organization.name} tasks`: "Your assigned tasks"}</h1>
              {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tasks.map((task) => (
    
                <div className="block max-w-sm p-6 border rounded-xl shadow-sm" key={task.id}>
                    <h5 className="mb-3 flex items-center justify-center text-2xl font-semibold tracking-tight text-heading leading-8">{task.title}</h5>
                    <p className="text-body mb-6"> Assigned to:{" "} {task.assigned_to_name ? (task.assigned_to_name) : ( <span className="text-red-500 font-medium">Unassigned</span>)}</p>
                    <p className="text-body mb-6">Status: {TASK_STATUS_LABELS[task.status]}</p>
                    <p className="text-body mb-6">Created by: {task.created_by_name}</p>
                    <p className="text-body mb-6">Created: {task.created_at}</p>
                    <div className="flex items-center justify-center">
                    <Button  className="inline-flex cursor-pointer items-center text-white bg-black box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={() => router.push(`/organizations/${organizationId}/tasks/${task.id}`)}>
                        View Details
                        <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/></svg>
                    </Button>
                    </div>
                </div>
                ))}
                </div>
                {role === "admin" && (<div className="flex items-center justify-center mt-6">
                 <CreateTaskDialog onCreated={refetch} memberships={memberships}/>
                </div>)}

                <Button  className="inline-flex mt-6 cursor-pointer items-center text-white bg-blue-700 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" onClick={() => router.push(`/organizations/${organizationId}/`)}>
                   
            <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4 4m-4-4l4-4"/></svg>
                Go Back
        </Button>   
            </main>
    
        </div>
  );
}
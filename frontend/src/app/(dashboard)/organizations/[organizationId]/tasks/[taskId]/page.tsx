"use client";

import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";
import { Card } from "@/components/ui/card";
import {  useMemberships } from "@/hooks/membershipHooks";
import { useOrganization } from "@/hooks/organizationHooks";
import {  TASK_STATUS_LABELS } from "@/constants/rolesAndTaskStatus";
import { useTask } from "@/hooks/taskhooks";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import DeleteTaskDialog from "@/components/tasks/DeleteTaskDialog";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { useEffect } from "react";

export default function MembershipDetailsPage() {

  const params = useParams();
  const router = useRouter();
  const { setItems } =  useBreadcrumbs();
  const organizationId = Number(params.organizationId);
  const {organization  } = useOrganization(organizationId);
  const taskId = Number(params.taskId);
  const {memberships, } = useMemberships(organizationId);
  

  const {
    task,
    loading,
    error,
  } = useTask(organizationId, taskId);

  useEffect(() => {
      
        if (!task || !organization) return;
      
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
          {
            label: task.title,
            href: `/organizations/${organization.id}/tasks/${task.id}`
          },
        ]);
      
      }, [organization, task, setItems]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !task || !organization) {
    return (
      <p>
        Failed to load task or organization
      </p>
    );
  }

  const role = organization.current_user_role;

  return (

    <div className="h-full flex flex-col gap-4 p-4">

      <h1 className="text-xl md:text-2xl font-bold text-center px-4">
        ({task.title}) Details
      </h1>

      <div className="flex justify-center mt-4 ">
        
        <Card className="">

            <p className="ml-3 mr-3 text-lg text-foreground">Task title: {task.title} </p>         
            <p className="ml-3 mr-3 text-lg text-foreground">Task Description: {task.description} </p>
            <p className="ml-3 mr-3 text-lg text-foreground">Organization: {organization.name}</p>
            <p className="ml-3 mr-3 text-lg text-foreground">Assigned to:{" "} {task.assigned_to_name ? (task.assigned_to_name) : (<span className="text-red-500 font-medium">Unassigned</span>)}</p>
            <p className="ml-3 mr-3 text-lg text-foreground">Status: {TASK_STATUS_LABELS[task.status]}</p>
            <p className="ml-3 mr-3 text-lg text-foreground">Created by: {task.created_by_name}</p>
            <p className="ml-3 mr-3 text-lg text-foreground">Created at: {task.created_at}</p>

            <div className="flex justify-around m-auto  pb-6">
                <EditTaskDialog organizationId={organizationId} memberships={memberships} task={task} role={role} />
         {role === "admin" && (<DeleteTaskDialog organizationId={organizationId} task={task}/>)}
      </div>
            
        </Card>

      </div>
      
      <div className="mt-auto">
      <Button  className=" cursor-pointer items-center text-white bg-blue-700 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm focus:outline-none" onClick={() => router.push(`/organizations/${organizationId}/tasks/`)}>
                   
            <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4 4m-4-4l4-4"/></svg>
                Go Back
        </Button>
        </div>
    </div>

    
  );
}
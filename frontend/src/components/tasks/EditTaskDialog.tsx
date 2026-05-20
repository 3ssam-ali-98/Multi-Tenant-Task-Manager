"use client";

import { useState } from "react";

import { toast }
from "sonner";

import {  Dialog,  DialogClose,  DialogContent,  DialogDescription,  DialogFooter,  DialogHeader,  DialogTitle,  DialogTrigger,} from "@/components/ui/dialog";

import { Button }from "@/components/ui/button";

import {extractErrorMessage} from "@/lib/extractErrorMessage";

import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Membership } from "@/types/membership";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter } from "next/dist/client/components/navigation";
import { Task } from "@/types/task";
import { updateTask } from "@/services/taskService";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";


interface Props {
  organizationId: number;
  memberships: Membership[];
  task: Task;
  role: "admin" | "member";
  

}

export default function
EditTaskDialog({
  organizationId,
  memberships,
  task,
  role
}: Props) {

  const [open, setOpen] = useState(false);
  const [title, setTitle] =  useState(task.title);
  const [description, setDescription] =  useState(task.description);
  const [status, setStatus] =  useState(task.status);
  const [assignedTo, setAssignedTo] = useState(task.assigned_to?.toString() || "unassigned")  
  const router = useRouter();
  

  console.log(assignedTo)
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

  e.preventDefault();

  try {

    setLoading(true);

    setError("");

    await updateTask(organizationId, task.id, 
      {
        title: title,
        description: description,
        status: status,
        assigned_to:  assignedTo === "unassigned" ? null : Number(assignedTo)
      }
    );

    toast.success("Task updated successfully", { position: "top-center", style: { background: "blue", color: "white" }, duration: 2000 });


    setOpen(false);
    
    router.push(`/organizations/${organizationId}/tasks/`);

  } catch (error) {

    setError(
      extractErrorMessage(error)
    );

  } finally {

    setLoading(false);
  }
}return (
   
    <Dialog open={open} onOpenChange={setOpen}>
      
        <DialogTrigger asChild>

       <Button variant="outline" className="ml-6 mr-6">Edit Task</Button>

        </DialogTrigger>
    
        <DialogContent className="sm:max-w-sm" onInteractOutside={(e) => { e.preventDefault(); }}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle >Update Task Details</DialogTitle>
            <DialogDescription>
              Update {task.title} details
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title-1">Title</Label>
              
              <Input placeholder="Task title" disabled={role !== "admin"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Field>

            <Field>
              <Label htmlFor="description-1">Description</Label>
              
              <Textarea placeholder="Task description" disabled={role !== "admin"} value={description} className="resize-y" onChange={(e) => setDescription(e.target.value)}/>
            </Field>

            <Field>
              <Label htmlFor="status-1">Status</Label>
              
              <Select  value={status}  onValueChange={(value) =>  setStatus(value as "todo" | "in_progress" | "done")}>

                <SelectTrigger>

                  <SelectValue placeholder="Select status"/>

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="todo">
                    To Do
                  </SelectItem>

                  <SelectItem value="in_progress">
                    In Progress
                  </SelectItem>

                  <SelectItem value="done">
                    Done
                  </SelectItem>

                </SelectContent>

              </Select>

            </Field>

            <Field>
              <Label htmlFor="assigned-to-1">Assign To</Label>
              

              <Select value={assignedTo} disabled={role !== "admin"} onValueChange={(value) => setAssignedTo(value)}>

                <SelectTrigger>

                  <SelectValue placeholder="Assign task"/>

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="unassigned"> Unassigned </SelectItem>

                  {memberships.map(
                    (membership) => (
                      <SelectItem key={membership.id} value={membership.id.toString()}>

                        {membership.member_name}

                      </SelectItem>

                    )
                  )}
                  

                </SelectContent>

              </Select>
              
            </Field>
          </FieldGroup>
          {error && (<p className="text-red-500 text-sm">{error}</p>)}
          <DialogFooter className="justify-end mt-4">
            <DialogClose className="bg-red-700 text-primary-foreground hover:bg-red-700/80 h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " >Cancel</DialogClose> 
            <Button type="submit" disabled={loading} >{loading ? "Updating..." : "Update"}</Button>
          </DialogFooter>
         </form>
        </DialogContent>
      
    </Dialog>
  )
}
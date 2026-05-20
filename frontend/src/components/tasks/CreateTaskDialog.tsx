"use client";

import { useState } from "react";
import {  Dialog,  DialogClose,  DialogContent,  DialogDescription,  DialogFooter,  DialogHeader,  DialogTitle,  DialogTrigger} from "@/components/ui/dialog";
import { Button }from "@/components/ui/button";
import { Input }from "@/components/ui/input";
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useParams } from "next/dist/client/components/navigation";
import { Membership } from "@/types/membership";
import { createTask } from "@/services/taskService";
import { Textarea } from "../ui/textarea";

interface Props {  
  memberships: Membership[];
  onCreated: () => void;
}

export default function
CreateTaskDialog({
  memberships,
  onCreated,
}: Props) {

  const [open, setOpen] =  useState(false);
  const params = useParams();
  const organizationId = Number(params.organizationId);
  const [title, setTitle] =  useState("");
  const [description, setDescription] =  useState("");
  const [status, setStatus] =  useState<"todo" | "in_progress" | "done">("todo");
  const [assignedTo, setAssignedTo] = useState("unassigned");
  
  const [loading, setLoading] = useState(false);

  const [error, setError] =  useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

  e.preventDefault();

  try {

    setLoading(true);

    setError("");

    await createTask(organizationId, {
      title: title,
      description: description,
      status: status,
      assigned_to:  assignedTo === "unassigned" ? null : Number(assignedTo)
    });
    toast.success("Task created successfully", { position: "top-center", style: { background: "green", color: "white" }, duration: 2000 });

    onCreated();

    setOpen(false);

    setTitle("");
    setDescription("");
    setStatus("todo");
    setAssignedTo("unassigned");

  } catch (error) {

    setError(extractErrorMessage(error));

  } finally {

    setLoading(false);
  }
}return (
   
    <Dialog open={open} onOpenChange={setOpen}>
      
        <DialogTrigger asChild>

       <Button className="bg-blue-700">Add Task</Button>

        </DialogTrigger>
    
        <DialogContent className="sm:max-w-sm" onInteractOutside={(e) => { e.preventDefault(); }}>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-center mb-3">
            <DialogTitle>Add a new Task</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title-1">Title</Label>
              <DialogDescription>
            please enter the title of the task you want to add.
          </DialogDescription>
              <Input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Field>

            <Field>
              <Label htmlFor="description-1">Description</Label>
              <DialogDescription>
            please enter the description of the task you want to add.
          </DialogDescription>
              <Textarea placeholder="Task description" value={description} className="resize-y" onChange={(e) => setDescription(e.target.value)}/>
            </Field>

            <Field>
              <Label htmlFor="status-1">Status</Label>
              <DialogDescription>
            please enter the status of the task you want to add.
          </DialogDescription>
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
              <DialogDescription>
            please select the member to assign the task to, if you want to leave the task unassigned, just select &quot;Unassigned&quot;.
          </DialogDescription>

              <Select value={assignedTo} onValueChange={(value) => setAssignedTo(value)}>

                <SelectTrigger>

                  <SelectValue placeholder="Assign task"/>

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="Unassigned"> Unassigned </SelectItem>

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
            <Button type="submit" disabled={loading} >{loading ? "Adding..." : "Add Task"}</Button>
          </DialogFooter>
         </form>
        </DialogContent>
      
    </Dialog>
  )
}




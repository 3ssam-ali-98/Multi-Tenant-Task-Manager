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
import { createMembership } from "@/services/membershipService";
import { useParams } from "next/dist/client/components/navigation";

interface Props {  onCreated: () => void;}

export default function
CreateMembershipDialog({
  onCreated,
}: Props) {

  const [open, setOpen] =  useState(false);
  const params = useParams();
  const organizationId = Number(params.organizationId);
  const [email, setEmail] =  useState("");
  const [role, setRole] =  useState<"admin" | "member">("member");
  const [loading, setLoading] = useState(false);

  const [error, setError] =  useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

  e.preventDefault();

  try {

    setLoading(true);

    setError("");

    await createMembership(organizationId, {
      email,
      role
    });
    toast.success("Member added successfully", { position: "top-center", style: { background: "green", color: "white" }, duration: 2000 });

    onCreated();

    setOpen(false);

    setEmail("");

  } catch (error) {

    setError(extractErrorMessage(error));

  } finally {

    setLoading(false);
  }
}return (
   
    <Dialog open={open} onOpenChange={setOpen}>
      
        <DialogTrigger asChild>

       <Button className="bg-blue-700">Add Member</Button>

        </DialogTrigger>
    
        <DialogContent className="sm:max-w-sm" onInteractOutside={(e) => { e.preventDefault(); }}>
        <form onSubmit={handleSubmit}>
          <DialogHeader className="text-center mb-3">
            <DialogTitle>Add a new Member</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="email-1">Email</Label>
              <DialogDescription>
            please enter the email of the member you want to add. the email should be associated with an existing account.
          </DialogDescription>
              <Input placeholder="Member email" value={email}  onChange={(e) => setEmail(e.target.value)}/>
            </Field>

            <Field>
              <Label htmlFor="role-1">Role</Label>
              <DialogDescription>
            please enter the role of the member you want to add, the default role is &quot;member&quot;. 
          </DialogDescription>
              <Select  value={role}  onValueChange={(value) =>  setRole(value as "admin" | "member")}>

                <SelectTrigger>

                  <SelectValue placeholder="Select role"/>

                </SelectTrigger>

                <SelectContent>

                  <SelectItem value="member">
                    Member
                  </SelectItem>

                  <SelectItem value="admin">
                    Admin
                  </SelectItem>

                </SelectContent>

              </Select>
              
            </Field>
          </FieldGroup>

          
          {error && (<p className="text-red-500 text-sm">{error}</p>)}
          <DialogFooter className="justify-end mt-4">
            <DialogClose className="bg-red-700 text-primary-foreground hover:bg-red-700/80 h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " >Cancel</DialogClose> 
            <Button type="submit" disabled={loading} >{loading ? "Adding..." : "Add Member"}</Button>
          </DialogFooter>
         </form>
        </DialogContent>
      
    </Dialog>
  )
}




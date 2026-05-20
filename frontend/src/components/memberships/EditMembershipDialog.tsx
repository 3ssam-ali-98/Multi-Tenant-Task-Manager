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
import { updateMembership } from "@/services/membershipService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useRouter } from "next/dist/client/components/navigation";


interface Props {
  organizationId: number;
  membership: Membership;

}

export default function
EditMembershipDialog({
  organizationId,
  membership,
}: Props) {

  const [open, setOpen] = useState(false);

  const [role, setRole] = useState(membership.role);
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

  e.preventDefault();

  try {

    setLoading(true);

    setError("");

    await updateMembership(organizationId, membership.id, 
      {
        role: role,
      }
    );

    toast.success("Membership updated successfully", { position: "top-center", style: { background: "blue", color: "white" }, duration: 2000 });


    setOpen(false);
    
    router.push(`/organizations/${organizationId}/memberships/`);

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

       <Button variant="outline" className="ml-6 mr-6">Change Membership Role</Button>

        </DialogTrigger>
    
        <DialogContent className="sm:max-w-sm" onInteractOutside={(e) => { e.preventDefault(); }}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle >Change Membership Role</DialogTitle>
            <DialogDescription>
              Update {membership.member_name} role in the organization
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="role-1">Role</Label>
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
            <Button type="submit" disabled={loading} >{loading ? "Updating..." : "Update"}</Button>
          </DialogFooter>
         </form>
        </DialogContent>
      
    </Dialog>
  )
}
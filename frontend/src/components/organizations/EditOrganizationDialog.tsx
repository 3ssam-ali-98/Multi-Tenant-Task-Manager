"use client";

import { useState } from "react";

import { toast }
from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button }
from "@/components/ui/button";

import { Input }
from "@/components/ui/input";

import {
  updateOrganization
} from "@/services/organizationService";

import {
  extractErrorMessage
} from "@/lib/extractErrorMessage";

import {
  Organization
} from "@/types/organization";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { useRouter } from "next/dist/client/components/navigation";


interface Props {

  organization: Organization;

}

export default function
EditOrganizationDialog({
  organization,
}: Props) {

  const router = useRouter();
  

  const [open, setOpen] =
    useState(false);

  const [name, setName] =
    useState(organization.name);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

async function handleSubmit(
  e: React.SubmitEvent<HTMLFormElement>
) {

  e.preventDefault();

  try {

    setLoading(true);

    setError("");

    await updateOrganization(
      organization.id,
      {
        name,
      }
    );

    toast.success("Organization updated successfully", { position: "top-center", style: { background: "blue", color: "white" }, duration: 2000 });

    setOpen(false);
    router.push(`/organizations/`);

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

       <Button variant="outline">Edit Organization</Button>

        </DialogTrigger>
    
        <DialogContent className="sm:max-w-sm" onInteractOutside={(e) => { e.preventDefault(); }}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle >Edit Organization</DialogTitle>
            <DialogDescription>
              Update the details for your organization.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input placeholder="Organization name" value={name}  onChange={(e) => setName(e.target.value)}/>
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
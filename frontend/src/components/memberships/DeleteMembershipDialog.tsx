"use client";

import { useState } from "react";
import { toast } from "sonner";
import {  Dialog,  DialogClose,  DialogContent,  DialogDescription,  DialogFooter,  DialogHeader,  DialogTitle,  DialogTrigger,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {  extractErrorMessage} from "@/lib/extractErrorMessage";
import { Membership } from "@/types/membership";
import { deleteMembership } from "@/services/membershipService";
import { useRouter } from "next/dist/client/components/navigation";

interface Props {
  organizationId: number;
  membership: Membership;
}

export default function
DeleteMembershipDialog({organizationId, membership, }: Props) {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] =  useState(false);
  const router = useRouter();
  
  const [error, setError] = useState("");

  async function handleDelete() {

    try {

      setLoading(true);

      setError("");

      await deleteMembership(organizationId, membership.id);

      toast.success("Membership removed successfully", { position: "top-center", style: { background: "red", color: "white" }, duration: 2000 });


      setOpen(false);
      router.push(`/organizations/${organizationId}/memberships/`);

    } catch (error) {

      setError(extractErrorMessage(error));

    } finally {

      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
        <DialogTrigger asChild>

       <Button variant="destructive" className="ml-6 mr-6">Remove Membership</Button>

        </DialogTrigger>
    
        <DialogContent className="sm:max-w-sm" onInteractOutside={(e) => { e.preventDefault(); }}>
          <DialogHeader>
            <DialogTitle >Remove Membership</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove &quot; {membership.member_name} &quot; membership? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {error && (<p className="text-red-500 text-sm">{error}</p>)}
          <DialogFooter className="justify-end mt-4">
            <DialogClose className="bg-gray-500 text-primary-foreground hover:bg-gray-500 h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " >Cancel</DialogClose> 
            <Button onClick={handleDelete} disabled={loading} variant="destructive" >{loading ? "Removing..." : "Remove"}</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
  );
}
    
import { Organization} from "@/types/organization";

export function canEditOrganization(
  organization: Organization
) {

  return (
    organization.current_user_is_owner
  );
}

export function canDeleteOrganization(
  organization: Organization
) {

  return (
    organization.current_user_is_owner
  );
}

export function canManageMemberships(
  organization: Organization
) {

  return (organization.current_user_is_owner);
}

export function canManageTasks(
  organization: Organization
) {

  return (organization.current_user_role === "admin"
  );
}
import api from "@/lib/api";
import {  Membership } from "@/types/membership";

export async function getMemberships(organizationId: number) {

  const response = await api.get<Membership[]>(`/organizations/${organizationId}/memberships/`);

  return response.data;
}

export async function createMembership(organizationId: number,
  data: {
    email: string;
    role?: "admin" | "member";
  }
) {

  const response = await api.post<Membership>(`/organizations/${organizationId}/memberships/`, data);

  return response.data;
}


export async function getMembershipDetails(  organizationId: number,  membershipId: number) {

  const response = await api.get<Membership>(`/organizations/${organizationId}/memberships/${membershipId}/`);
    

  return response.data;
}

export async function updateMembership(organizationId: number, membershipId: number,
  data: {
    role?: "admin" | "member";
  }
) {

  const response = await api.patch<Membership>(`/organizations/${organizationId}/memberships/${membershipId}/`, data);

  return response.data;
}

export async function deleteMembership(organizationId: number, membershipId: number) {

  await api.delete(`/organizations/${organizationId}/memberships/${membershipId}/`);
}
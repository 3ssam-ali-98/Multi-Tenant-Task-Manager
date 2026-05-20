import api from "@/lib/api";

import {
  Organization
} from "@/types/organization";

export async function
getOrganizations() {

  const response =
    await api.get<Organization[]>(
      "/organizations/"
    );

  return response.data;
}

export async function
createOrganization(
  data: {
    name: string;
  }
) {

  const response =
    await api.post<Organization>(
      "/organizations/",
      data
    );

  return response.data;
}


export async function
getOrganizationDetails(
  organizationId: number
) {

  const response =
    await api.get<Organization>(
      `/organizations/${organizationId}/`
    );

  return response.data;
}

export async function updateOrganization(
  organizationId: number,
  data: {
    name?: string;
  }
) {

  const response =
    await api.patch<Organization>(
      `/organizations/${organizationId}/`,
      data
    );

  return response.data;
}

export async function deleteOrganization(
  organizationId: number
) {

  await api.delete(
    `/organizations/${organizationId}/`
  );
}
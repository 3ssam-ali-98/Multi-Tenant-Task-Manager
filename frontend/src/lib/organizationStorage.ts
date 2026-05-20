export function setSelectedOrganization(
  id: number,
  name: string
) {

  sessionStorage.setItem(
    "selectedOrganizationId",
    id.toString()
  );

  sessionStorage.setItem(
    "selectedOrganizationName",
    name
  );
}

export function getSelectedOrganization() {

  const id =
    sessionStorage.getItem(
      "selectedOrganizationId"
    );

  const name =
    sessionStorage.getItem(
      "selectedOrganizationName"
    );

  return {
    id,
    name,
  };
}

export function clearSelectedOrganization() {

  sessionStorage.removeItem(
    "selectedOrganizationId"
  );

  sessionStorage.removeItem(
    "selectedOrganizationName"
  );
}
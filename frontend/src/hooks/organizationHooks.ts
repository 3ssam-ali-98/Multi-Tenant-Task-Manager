"use client";

import { useCallback, useEffect, useState} from "react";
import { getOrganizations, getOrganizationDetails} from "@/services/organizationService";
import { Organization } from "@/types/organization";
import { extractErrorMessage } from "@/lib/extractErrorMessage";

export function useOrganizations() {

  const [
    organizations,
    setOrganizations
  ] = useState<Organization[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchOrganizations =
    useCallback(async () => {

      try {

        setLoading(true);

        setError("");

        const data =
          await getOrganizations();

        setOrganizations(data);

      } catch (error) {

        setError(
          extractErrorMessage(error)
        );

      } finally {

        setLoading(false);
      }

    }, []);

  useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
    fetchOrganizations();

  }, [fetchOrganizations]);

  return {
    organizations,

    loading,

    error,

    refetch:
      fetchOrganizations,
  };
}

export function useOrganization(organizationId: number) {

    const [organization, setOrganization] = useState<Organization | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchOrganization =
      useCallback(async () => {
        if (!organizationId) return;
        try {

          setLoading(true);

          setError("");

          const data =
            await getOrganizationDetails(
              organizationId
            );

          setOrganization(data);

        } catch (error) {

          setError(
            extractErrorMessage(error)
          );

        } finally {

          setLoading(false);
        }

      }, [organizationId]);
      

    useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
      fetchOrganization();
    }, [fetchOrganization]);

    return {
      organization,

      loading,

      error,

      refetch:
        fetchOrganization,
    };
  }
"use client";

import { useCallback, useEffect, useState} from "react";
import { extractErrorMessage } from "@/lib/extractErrorMessage";
import { getMemberships, getMembershipDetails } from "@/services/membershipService";
import { Membership } from "@/types/membership";

export function useMemberships(organizationId: number) {

  const [memberships, setMemberships] = useState<Membership[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchMemberships = useCallback(async () => {

      try {

        setLoading(true);

        setError("");

        const data = await getMemberships(organizationId);

        setMemberships(data);

      } catch (error) {

        setError(extractErrorMessage(error));

      } finally {

        setLoading(false);
      }

    }, [organizationId]);

  useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMemberships();

  }, [fetchMemberships]);

  return {
    memberships,

    loading,

    error,

    refetch: fetchMemberships
  };
}

export function useMembership(organizationId: number, membershipID: number) {

    const [membership, setMembership] = useState<Membership | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchMembership = useCallback(async () => {
        if (!organizationId || !membershipID) return;
        try {

          setLoading(true);

          setError("");

          const data = await getMembershipDetails(organizationId, membershipID);

          setMembership(data);

        } catch (error) {

          setError(extractErrorMessage(error));

        } finally {

          setLoading(false);
        }

      }, [organizationId, membershipID]);
      

    useEffect(() => {
// eslint-disable-next-line react-hooks/set-state-in-effect
      fetchMembership();
    }, [fetchMembership]);

    return {
      membership,

      loading,

      error,

      refetch: fetchMembership,
    };
  }
"use client";

import { useEffect } from "react";

import { useRouter }
from "next/navigation";

import { useAuth }
from "@/hooks/useAuth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const {isAuthenticated, loading} = useAuth();

  useEffect(() => {

    if (
      !loading &&
      isAuthenticated
    ) {
      router.push("/dashboard");
    }

  }, [
    isAuthenticated,
    loading,
    router,
  ]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {children}
    </div>
  );
}
// src/app/dashboard/page.tsx

"use client";

import Link from "next/link";

import {
  Building2,
  // CheckSquare,
  // Users,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  useOrganizations,
} from "@/hooks/organizationHooks";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { useEffect } from "react";

export default function DashboardPage() {

  const {
    organizations,
    loading,
    error,
  } = useOrganizations();
  const { setItems } =  useBreadcrumbs();
  
  useEffect(() => {
  
  
    setItems([
      {
        label: "Dashboard",
        href: "/dashboard",
      },
    ]);
  
  }, [setItems]);

  if (loading) {
    return (
      <div className="p-6">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (

    <main className="p-6 space-y-8">

      {/* HEADER */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">

            Dashboard

          </h1>

          <p className="text-muted-foreground">

            Overview of your organizations and workspace activity.

          </p>

        </div>

        <Button asChild>

          <Link href="/organizations">

            View Organizations
            <ArrowRight className="ml-2 size-4" />

          </Link>

        </Button>

      </div>

      {/* STATS */}

      <div className="grid gap-6 md:grid-cols-3">

        <Card className="rounded-2xl">

          <CardHeader className="flex flex-row items-center justify-between space-y-0">

            <CardTitle className="text-sm font-medium">

              Organizations

            </CardTitle>

            <Building2 className="size-5 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-3xl font-bold">

              {organizations.length}

            </div>

          </CardContent>

        </Card>

        {/* <Card className="rounded-2xl">

          <CardHeader className="flex flex-row items-center justify-between space-y-0">

            <CardTitle className="text-sm font-medium">

              Memberships

            </CardTitle>

            <Users className="size-5 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-3xl font-bold">

              --

            </div>

            <p className="text-sm text-muted-foreground mt-1">

              Add membership stats later

            </p>

          </CardContent>

        </Card>

        <Card className="rounded-2xl">

          <CardHeader className="flex flex-row items-center justify-between space-y-0">

            <CardTitle className="text-sm font-medium">

              Tasks

            </CardTitle>

            <CheckSquare className="size-5 text-muted-foreground" />

          </CardHeader>

          <CardContent>

            <div className="text-3xl font-bold">

              --

            </div>

            <p className="text-sm text-muted-foreground mt-1">

              Add task stats later

            </p>

          </CardContent>

        </Card> */}

      </div>

      {/* ORGANIZATIONS */}

      <section className="space-y-4">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-semibold">

            Your Organizations

          </h2>

          <Button
            asChild
            variant="outline"
          >

            <Link href="/organizations">

              Manage All

            </Link>

          </Button>

        </div>

        {organizations.length === 0 ? (

          <Card className="rounded-2xl">

            <CardContent className="py-10 text-center">

              <Building2 className="size-10 mx-auto text-muted-foreground" />

              <h3 className="mt-4 text-lg font-semibold">

                No organizations yet

              </h3>

              <p className="mt-2 text-sm text-muted-foreground">

                Create your first organization to get started.

              </p>

            </CardContent>

          </Card>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {organizations.map((organization) => (

              <Card
                key={organization.id}
                className="rounded-2xl transition hover:shadow-md"
              >

                <CardContent className="p-6">

                  <div className="flex items-start justify-between">

                    <div>

                      <h3 className="text-lg font-semibold">

                        {organization.name}

                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">

                        Owner: {organization.owner}

                      </p>

                    </div>

                    <div className="text-xs rounded-full border px-3 py-1">

                      {organization.current_user_role}

                    </div>

                  </div>

                  <div className="mt-6 flex justify-end">

                    <Button asChild>

                      <Link
                        href={`/organizations/${organization.id}`}
                      >

                        Open

                      </Link>

                    </Button>

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}
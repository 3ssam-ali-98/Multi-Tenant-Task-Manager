// src/app/page.tsx

"use client";

import Link from "next/link";

import {  ArrowRight,  Building2,  ShieldCheck,  Users,  CheckSquare,} from "lucide-react";
import { useAuth }from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function HomePage() {

  const { isAuthenticated } =  useAuth();
  const features = [
    {
      title: "Multi-Tenant Organizations",
      description:
        "Manage multiple organizations with isolated memberships and tasks.",
      icon: Building2,
    },
    {
      title: "Role-Based Permissions",
      description:
        "Owners, admins, and members each have different access levels.",
      icon: ShieldCheck,
    },
    {
      title: "Task Management",
      description:
        "Assign, track, and organize tasks across teams and organizations.",
      icon: CheckSquare,
    },
    {
      title: "Membership Management",
      description:
        "Invite users, manage roles, and collaborate efficiently.",
      icon: Users,
    },
  ];

  return (

    <main className="min-h-screen bg-background">

      {/* HERO SECTION */}

      <section className="container mx-auto px-6 py-24">

        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">

            Organize teams,
            tasks, and collaboration
            in one place.

          </h1>

          <p className="mt-6 text-lg text-muted-foreground">

            A multi-tenant task management platform built with
            Next.js, TypeScript, Django REST Framework,
            and role-based permissions.

          </p>

          {
  isAuthenticated && (
    <p className="mt-6 text-lg font-semibold">

    Welcome back, Continue managing your organizations and tasks.

    </p>
  )
}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

            
            {isAuthenticated ? (

              <Button asChild size="lg">

                <Link href="/dashboard">

                  Go to Dashboard
                  <ArrowRight className="ml-2 size-4" />

                </Link>

              </Button>

            ) : (

              <>

                <Button asChild size="lg">

                  <Link href="/signup">

                    Get Started
                    <ArrowRight className="ml-2 size-4" />

                  </Link>

                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                >

                  <Link href="/login">

                    Login

                  </Link>

                </Button>

              </>

            )}

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="container mx-auto px-6 pb-24">

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (

              <Card
                key={feature.title}
                className="rounded-2xl"
              >

                <CardContent className="p-6">

                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl border">

                    <Icon className="size-6" />

                  </div>

                  <h3 className="text-lg font-semibold">

                    {feature.title}

                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">

                    {feature.description}

                  </p>

                </CardContent>

              </Card>
            );
          })}

        </div>

      </section>

      {/* CTA */}

      <section className="border-t">

        <div className="container mx-auto px-6 py-16 text-center">

          <h2 className="text-3xl font-bold">

            Start managing your organizations today.

          </h2>

          <p className="mt-4 text-muted-foreground">

            Secure multi-tenant collaboration with role-aware task management.

          </p>

          <Button
            asChild
            size="lg"
            className="mt-8"
          >

            <Link href="/register">

              Create Account

            </Link>

          </Button>

        </div>

      </section>

    </main>
  );
}
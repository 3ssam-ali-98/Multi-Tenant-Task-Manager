"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  useBreadcrumbs,
} from "@/context/BreadcrumbContext";

export default function
AppBreadcrumbs() {

  const { items } =
    useBreadcrumbs();

  return (

    <Breadcrumb>

      <BreadcrumbList>

        {items.map(
          (item, index) => {

            const isLast =
              index === items.length - 1;

            return (

              <div
                key={item.label}
                className="flex items-center"
              >

                <BreadcrumbItem>

                  {isLast || !item.href ? (

                    <BreadcrumbPage>

                      {item.label}

                    </BreadcrumbPage>

                  ) : (

                    <BreadcrumbLink asChild>

                      <Link href={item.href}>

                        {item.label}

                      </Link>

                    </BreadcrumbLink>

                  )}

                </BreadcrumbItem>

                {!isLast && (
                  <BreadcrumbSeparator />
                )}

              </div>
            );
          }
        )}

      </BreadcrumbList>

    </Breadcrumb>
  );
}
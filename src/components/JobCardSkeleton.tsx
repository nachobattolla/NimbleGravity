"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** Loading view: skeleton matching JobCard layout. Shown until jobs are fetched; then JobCard (client) is shown. */
export function JobCardSkeleton() {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="text-lg">
          <Skeleton className="h-6 w-48" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-9 w-full" />
          </div>
          <Skeleton className="h-9 w-36" />
        </div>
      </CardContent>
    </Card>
  );
}


import { Skeleton } from "@/components/ui/skeleton";
import { Leaf } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden h-screen w-72 flex-col border-r bg-muted/30 md:flex">
        <div className="border-b p-4">
           <div className="flex items-center gap-2 p-2">
            <Leaf className="h-8 w-8 text-primary/50" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="p-2">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
      <main className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-10 w-3/4" />
            <Skeleton className="mx-auto h-6 w-1/2" />
          </div>
          <Skeleton className="mx-auto h-64 w-full" />
        </div>
      </main>
    </div>
  );
}

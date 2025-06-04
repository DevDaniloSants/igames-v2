import { Skeleton } from "@/app/_components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mt-6 flex w-full flex-col xl:w-[1200px]">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="my-2 h-16 w-96" />
      <Skeleton className="relative mb-4 h-[550px] min-h-[300px] w-full" />

      <Skeleton className="h-14 w-full" />
      <div className="mt-6 space-y-1">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="mt-6">
        <Skeleton className="mb-2 h-6 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default Loading;

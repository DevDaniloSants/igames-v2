import { Skeleton } from "@/app/_components/ui/skeleton";

export const LatestNewsCarouselSkeleton = () => {
  return (
    <div className="row-span-1 grid h-[300px] gap-2 overflow-hidden md:min-h-[600px] md:grid-cols-1 md:grid-rows-3 lg:grid-cols-2 lg:grid-rows-none">
      <Skeleton className="group relative cursor-pointer lg:rounded-l-lg">
        <div className="absolute bottom-2 z-10 w-full space-y-4 pb-2 pl-4">
          <Skeleton className="h-7 w-[50%] bg-white/15" />

          <Skeleton className="h-5 w-[90%] bg-white/15" />
        </div>
      </Skeleton>

      <div className="hidden gap-2 md:row-span-2 md:grid md:space-y-0 lg:row-span-1">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="relative row-span-1 h-full">
            <div className="absolute bottom-2 z-10 w-full space-y-4 pb-2 pl-4">
              <Skeleton className="h-7 w-[50%] bg-white/15" />

              <Skeleton className="h-5 w-[90%] bg-white/15" />
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

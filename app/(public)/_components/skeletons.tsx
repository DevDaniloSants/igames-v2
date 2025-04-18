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

export const LatestNewsTitlesSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="space-y-2 pb-2">
          <Skeleton className="h-5 w-4/6" />
          <Skeleton className="h-3 w-11/12" />
        </div>
      ))}
    </>
  );
};

export const PostListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex w-full flex-col gap-2">
          <div className="group flex cursor-pointer flex-col gap-2 md:flex-row">
            <Skeleton className="flex h-36 w-full rounded-lg md:max-h-[135px] md:min-h-[135px] md:min-w-[200px] md:max-w-[200px]" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-6 w-11/12" />
              <div className="flex w-full gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-white/15" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 rounded-full bg-white/15" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>

              <Skeleton className="mt-4 h-10 w-full lg:w-11/12" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

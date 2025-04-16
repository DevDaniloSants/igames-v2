import { cn } from "@/app/_lib/utils";

export const AdminHeaderTitle = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return <h2 className={cn("text-xl font-semibold", className)}>{name}</h2>;
};

export const AdminHeaderDescription = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return <p className={cn("text-sm text-gray-500", className)}>{name}</p>;
};

export const AdminHeaderInfo = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("space-y-1", className)}>{children}</div>;
};

export const AdminHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-between py-6", className)}>
      {children}
    </div>
  );
};

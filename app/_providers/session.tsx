import { auth } from "@/auth";
import { SessionProvider as _SessionProvider } from "next-auth/react";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <_SessionProvider session={session}>{children}</_SessionProvider>;
}

"use client";

import { useAuth } from "@aroma/store/useAuthContext";
import { notification } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  console.log(pathname);
  

  const publicPath = ["/auth/login", "/auth/register"];

  useEffect(() => {
    if (!loading) {
      const isPublicPath = publicPath.includes(pathname);

      if (!user && !isPublicPath) {
        router.push("/auth/login");
        notification.error({ message: "Who are u? Login first!" });
      }

      if (user && isPublicPath) {
        router.push("/");
      }
    }
  }, [user, loading, pathname, router]);

  return children;
}

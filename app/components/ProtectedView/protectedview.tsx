"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  validator?: () => boolean;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/",
  validator,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const valid = validator ? validator() : !!token;
    if (!valid) {
      router.replace(redirectTo);
    } else {
      setIsAllowed(true);
    }

    setChecking(false);
  }, [router, validator, redirectTo]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Verificando acceso...
      </div>
    );
  }

  if (!isAllowed) return null;

  return <>{children}</>;
}

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedViewProps {
  children: React.ReactNode;
}

export default function ProtectedView({ children }: ProtectedViewProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      router.replace("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <p className="text-center py-10 text-gray-500">Verificando sesión...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

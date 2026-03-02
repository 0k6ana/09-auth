"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkSession } from "@/lib/api/clientApi"; 
import { useAuthStore } from "@/lib/store/authStore";
import Loading from "@/app/loading"; 

interface AuthProviderProps {
  children: ReactNode;
  isPrivate?: boolean; 
}

export default function AuthProvider({ children, isPrivate = false }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearIsAuthenticated, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      try {
        const user = await checkSession();
        if (user) {
          setUser(user); 
        } else if (isPrivate) {
          clearIsAuthenticated();
          router.push("/sign-in"); 
        }
      } catch (err) {
        clearIsAuthenticated();
        if (isPrivate) router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [pathname]);

  if (loading) return <Loading />; 

  if (isPrivate && !isAuthenticated) return null; 

  return <>{children}</>;
}
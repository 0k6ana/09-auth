"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi"; // твій API для logout
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, clearIsAuthenticated, user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();               // виклик API для виходу
      clearIsAuthenticated();       // очищення Zustand-стану
      router.push("/sign-in");      // редірект на сторінку входу
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      {!isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/register" className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );
}
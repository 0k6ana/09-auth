import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi"; 
import css from "./Profile.module.css";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile page in NoteHub application",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfilePage() {
  // отримуємо дані користувача з API
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          {/* правильне посилання на редагування */}
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "https://ac.goit.global/fullstack/react/avatar-1.jpg"}
            alt={user.username || "User Avatar"}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
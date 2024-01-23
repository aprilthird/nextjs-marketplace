import ProfileForm from "@/lib/components/profile/form";
import CategoryService from "@/lib/services/category";
import React from "react";

export default async function ProfilePage() {
  const categories = await CategoryService.getAll();

  return (
    <div>
      <ProfileForm categories={categories} />
    </div>
  );
}

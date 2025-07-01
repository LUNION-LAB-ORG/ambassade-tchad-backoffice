"use client";
import { redirect } from "@/components/navigation";
const Backend = () => {
  redirect({ href: "/ecommerce/frontend", locale: 'fr' });
  return null;
};

export default Backend;

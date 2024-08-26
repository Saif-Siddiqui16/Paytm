"use client";

import { usePathname, useRouter } from "next/navigation";

export const Sidebar = ({ title, href }: { title: string; href: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const selected = pathname === href;
  return (
    <div className="w-full flex justify-center">
      <div
        className={`flex ${
          selected ? "bg-white" : ""
        } w-full px-20 hover:cursor-pointer `}
      >
        <button
          onClick={() => router.push(href)}
          className={`${selected ? "text-slate-500" : ""}`}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

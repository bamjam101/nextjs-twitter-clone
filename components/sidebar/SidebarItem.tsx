"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";

interface SiderbarItemProps {
  href?: string;
  label: string;
  icon: any;
  currentUser?: User | null;
}

const SidebarItem: React.FC<SiderbarItemProps> = ({
  href,
  label,
  icon,
  currentUser,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    if (!currentUser?.id && href !== "/") {
      loginModal.onOpen();
    }
    if (currentUser?.id && href) {
      router.push(href);
    }
  }, [router, href, currentUser, loginModal]);
  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-end lg:items-start"
    >
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        {icon && icon}
      </div>
      <div className="relative hidden lg:flex gap-4 items-center rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        {icon && icon}
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;

"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

interface LogoutButtonProps {
  icon: any;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ icon }) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    try {
      signOut();
      toast.success("Successfully Signed Out");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [router]);

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
        <p className="hidden lg:block text-white text-xl">Logout</p>
      </div>
    </div>
  );
};

export default LogoutButton;

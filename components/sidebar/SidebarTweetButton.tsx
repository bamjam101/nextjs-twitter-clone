"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { FaFeather } from "react-icons/fa";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);
  return (
    <div onClick={onClick} className="w-full">
      <div className="lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden w-full lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-80 cursor-pointer transition">
        <p className="hidden lg:block font-semibold text-center text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;

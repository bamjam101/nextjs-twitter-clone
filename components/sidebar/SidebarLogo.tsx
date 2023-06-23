"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 p-4 flex items-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
    >
      <Image
        src={"/logo.svg"}
        alt="Site-Logo"
        width={"56"}
        height={"56"}
        className="object-contain"
      />
    </div>
  );
};

export default SidebarLogo;

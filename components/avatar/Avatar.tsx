"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  profile?: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = async ({
  userId,
  profile,
  isLarge,
  hasBorder,
}) => {
  const router = useRouter();

  const handleClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `users/${userId}`;
      router.push(url);
    },
    [userId, router]
  );
  return (
    <div
      className={`
  ${hasBorder ? "border-4 border-black" : ""}
  ${isLarge ? "h-32 w-32" : "h-12 w-12"}
  rounded-full
  hover:opacity-90
  transition
  cursor-pointer
  relative
  `}
    >
      <Image
        src={profile ? profile : "/images/placeholder.svg"}
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={handleClick}
      />
    </div>
  );
};

export default Avatar;

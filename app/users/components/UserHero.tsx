import Avatar from "@/components/avatar/Avatar";
import Image from "next/image";
import React from "react";

interface UserHeroProps {
  coverImage?: string | null;
  profileImage?: string | null;
}

const UserHero: React.FC<UserHeroProps> = ({ coverImage, profileImage }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        <Image
          src={coverImage ? coverImage : "/images/cover-placeholder.jpg"}
          fill
          alt="Cover Image"
          style={{
            objectFit: "cover",
          }}
        />
        <div className="absolute -bottom-16 left-4 rounded-full bg-black">
          <Avatar
            profile={(profileImage as string) || undefined}
            isLarge
            hasBorder
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;

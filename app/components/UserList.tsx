import Avatar from "@/components/avatar/Avatar";
import { User } from "@prisma/client";
import React from "react";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      {users &&
        users.map(async (user: Record<string, any>) => {
          return (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar profile={user.image} userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserList;

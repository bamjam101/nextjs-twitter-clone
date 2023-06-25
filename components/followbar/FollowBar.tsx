import getUsers from "@/hooks/useUsers";
import Avatar from "../avatar/Avatar";
import UserList from "@/app/components/UserList";

const FollowBar = async () => {
  const users = await getUsers();
  if (users.length === 0) {
    return (
      <div className="px-6 py-4 hidden lg:block">
        <div className="bg-slate-300/10 rounded-xl p-4">
          <h2 className="text-white text-xl font-semibold">Who to follow</h2>
          <p className="text-md mt-4">
            {/* Users list from backend */}
            No users to display...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-slate-300/10 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className="flex flex-col gap-4 mt-4">
          {/* Users list from backend */}
          <UserList users={users} />
        </div>
      </div>
    </div>
  );
};

export default FollowBar;

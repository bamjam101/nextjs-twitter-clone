import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarTweetButton from "./SidebarTweetButton";
import getCurrentUser from "@/app/actions/getCurrentUser";
import LogoutButton from "../button/LogoutButton";

const Sidebar = async () => {
  const currentUser = await getCurrentUser();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: <BsHouseFill size={28} color="white" />,
    },
    {
      label: "Notification",
      href: "/notification",
      icon: <BsBellFill size={28} color="white" />,
    },
    {
      label: "Profile",
      href: `users/${currentUser?.id}`,
      icon: <FaUser size={28} color="white" />,
    },
  ];
  return (
    <aside className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px] flex flex-col items-end lg:items-start">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              currentUser={currentUser}
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}
          {currentUser && (
            <LogoutButton icon={<BiLogOut size={24} color="white" />} />
          )}
          <SidebarTweetButton />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

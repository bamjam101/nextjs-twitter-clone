interface SiderbarItemProps {
  href?: string;
  label: string;
  icon: any;
  onClick?: () => void;
}

const SidebarItem: React.FC<SiderbarItemProps> = ({
  onClick,
  href,
  label,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-col items-end lg:items-start">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="relative hidden lg:flex gap-4 items-center rounded-full p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;

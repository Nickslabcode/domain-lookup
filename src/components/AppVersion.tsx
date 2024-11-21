import { IoGitBranch } from 'react-icons/io5';

const AppVersion = () => {
  return (
    <div className="flex items-center gap-1 mr-3">
      <IoGitBranch size={18} />
      <span className="font-semibold">v{import.meta.env.VITE_APP_VERSION}</span>
      <span className="bg-primary text-primary-content text-xs py-0.5 px-1 rounded-md">
        beta
      </span>
    </div>
  );
};

export default AppVersion;

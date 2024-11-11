import { RiSearchLine } from 'react-icons/ri';

const Logo = () => {
  return (
    <div className="flex">
      <div className="font-semibold text-2xl flex items-center gap-1">
        <RiSearchLine strokeWidth={1} className="text-primary" />
        <h1 className="text-center">DomainLookup</h1>
      </div>
    </div>
  );
};

export default Logo;

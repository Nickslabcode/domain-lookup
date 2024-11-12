import { LuSearch } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex">
      <div className="font-semibold text-2xl flex items-center gap-1">
        <LuSearch strokeWidth={3} className="text-primary" />
        <Link to={'/'} className="text-center">
          DomainLookup
        </Link>
      </div>
    </div>
  );
};

export default Logo;

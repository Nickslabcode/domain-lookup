import { RiSearchLine } from 'react-icons/ri';
import { IoReturnDownBackSharp } from 'react-icons/io5';

const Navbar = () => {
  return (
    <div className="flex items-center gap-4 py-4 justify-around">
      <div className="flex">
        <div className="font-semibold text-2xl flex items-center gap-1">
          <RiSearchLine strokeWidth={1} className="text-primary" />
          <h1 className="text-center">DomainLookup</h1>
        </div>
      </div>
      <div className="flex gap-1 flex-1">
        <label className="flex items-center input input-sm input-bordered w-full">
          <input
            type="text"
            className="grow"
            placeholder="Search for a domain..."
            // onChange={event => setDomain(event.target.value)}
          />
          <kbd className="kbd kbd-sm flex gap-1">
            <IoReturnDownBackSharp />
            <span className="text-xs">Enter</span>
          </kbd>
        </label>
        <button
          className="btn btn-sm btn-primary"
          // onClick={() => getDnsRecordInfo(domain, dnsRecordType)}
          // disabled={domain ? false : true}
        >
          Accio!
        </button>
      </div>
    </div>
  );
};

export default Navbar;

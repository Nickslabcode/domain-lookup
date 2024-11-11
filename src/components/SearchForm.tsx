import { FormEvent, useState } from 'react';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('domain') || ''
  );
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSearchParams({ domain: searchQuery });
    navigate(`/results?domain=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form className="flex gap-2 w-96" onSubmit={handleSubmit}>
      <label
        className="flex items-center input input-sm input-bordered w-full"
        style={{ outline: 'none', boxShadow: 'none' }}
      >
        <input
          type="text"
          className="grow"
          placeholder="Search for a domain..."
          autoFocus
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <kbd className="kbd kbd-sm flex gap-1">
          <IoReturnDownBackSharp />
          <span className="text-xs">Enter</span>
        </kbd>
      </label>
      <button
        className="btn btn-sm btn-primary"
        type="submit"
        disabled={searchQuery ? false : true}
      >
        Accio!
      </button>
    </form>
  );
};

export default SearchForm;

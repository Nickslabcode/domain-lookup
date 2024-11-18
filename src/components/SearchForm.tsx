import { FormEvent, useState } from 'react';
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
    <form className="flex gap-2 w-1/2" onSubmit={handleSubmit}>
      <label
        className="flex items-center input input-sm input-bordered w-full"
        style={{ outline: 'none', boxShadow: 'none' }}
      >
        <input
          type="text"
          className="grow"
          placeholder="Type a domain..."
          autoFocus
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <kbd className="kbd kbd-sm text-xs py-0.5 px-1">t</kbd>
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

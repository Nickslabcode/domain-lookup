import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHistoryModal } from '../providers/HistoryProvider';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('domain') || ''
  );
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { historyPush } = useHistoryModal();

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (searchParams.get('domain') === searchQuery) return;

    historyPush(searchQuery);
    setSearchParams({ domain: searchQuery });
    navigate(`/results?domain=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.key === 't') {
      inputRef.current!.focus();
    }
  };

  return (
    <form className="flex gap-2 w-1/2" onSubmit={handleSubmit}>
      <label
        className="flex items-center input input-sm input-bordered w-full"
        style={{ outline: 'none', boxShadow: 'none' }}
      >
        <input
          type="text"
          className="grow placeholder:text-xs"
          placeholder="Type a domain..."
          autoFocus
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
          ref={inputRef}
        />
        <kbd className="kbd kbd-sm text-xs py-0.5 px-1">t</kbd>
      </label>
      <button
        className="btn btn-sm btn-primary"
        type="submit"
        disabled={
          searchQuery && searchParams.get('domain') !== searchQuery
            ? false
            : true
        }
      >
        Accio!
      </button>
    </form>
  );
};

export default SearchForm;

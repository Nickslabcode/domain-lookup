import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHistoryModal } from '../providers/HistoryProvider';
import { isDomainValid } from '../helpers/domain/isDomainValid.helper';
import { domainPipe } from '../helpers/domain/domainPipe';
import { extract } from '../helpers/domain/extract';
import { punyEncode } from '../helpers/domain/punyEncode';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { historyPush } = useHistoryModal();
  const [transformedDomain, setTransformedDomain] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const domain = searchParams.get('domain');

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const pipeResult = domainPipe(extract, punyEncode)(searchQuery);
    setTransformedDomain(pipeResult);
  }, [searchQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const isValid = isDomainValid(transformedDomain);

    if (!isValid) {
      setIsValid(false);
      return;
    } else if (domain === transformedDomain) {
      return;
    }

    historyPush(transformedDomain);
    setSearchParams({ domain: transformedDomain });
    setSearchQuery('');
    setIsValid(true);
    navigate(`/results?domain=${encodeURIComponent(transformedDomain)}`);
    setTimeout(() => window.scroll(0, 0), 50);
  };

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.key === 't') {
      inputRef.current!.focus();
    }
  };

  return (
    <form className="flex gap-2 w-[30rem]" onSubmit={handleSubmit}>
      <label
        className={`flex items-center input input-sm input-bordered w-full ${
          !isValid ? 'input-error' : ''
        }`}
        style={{ outline: 'none', boxShadow: 'none' }}
      >
        <input
          type="text"
          className="grow placeholder:text-xs "
          placeholder={domain ?? 'Type a valid domain...'}
          autoFocus
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value.toLowerCase())}
          ref={inputRef}
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

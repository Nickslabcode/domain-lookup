import { useEffect, useMemo, useRef, useState } from 'react';
import { useHistoryModal } from '../providers/HistoryProvider';
import { HistoryObject } from '../interfaces/HistoryObject';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ShortKeys from './ShortKeys';
import { Shortcut } from '../enums/Shortcut.enum';
import { FaTrash } from 'react-icons/fa';

const HistoryModal = () => {
  const { setIsModalOpen, isModalOpen, history, historyPush, clearHistory } =
    useHistoryModal();
  const historyInputRef = useRef<HTMLInputElement | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [_searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortedHistoryArray = useMemo(() => {
    return history.sort(
      (a: HistoryObject, b: HistoryObject) =>
        Number(b.searchedOn) - Number(a.searchedOn)
    );
  }, [history]);

  const filteredHistoryArray = useMemo(() => {
    if (!searchQuery) return sortedHistoryArray;

    return sortedHistoryArray.filter((item: HistoryObject) =>
      item.domain.includes(searchQuery)
    );
  }, [sortedHistoryArray, searchQuery]);

  useEffect(() => {
    const modal: HTMLDialogElement = document.querySelector('#history_modal')!;

    if (isModalOpen) {
      modal.showModal();
      modal.addEventListener('keyup', handleKeyUp);
    } else {
      modal.close();
      modal.removeEventListener('keyup', handleKeyUp);
    }

    return () => modal.removeEventListener('keyup', handleKeyUp);
  }, [isModalOpen]);

  const handleKeyUp = (event: KeyboardEvent): void => {
    if (event.key === 't') {
      historyInputRef.current?.focus();
    }
  };

  const handleClick = (value: string) => {
    setIsModalOpen(false);
    setSearchQuery('');
    historyPush(value);
    setSearchParams({ domain: value });
    navigate(`/results?domain=${encodeURIComponent(value)}`);
  };

  return (
    <dialog id="history_modal" className="modal backdrop-blur-sm">
      <div className="modal-box flex flex-col gap-4">
        <label
          className="flex items-center input input-sm input-bordered w-full"
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <input
            type="text"
            className="grow placeholder:text-xs"
            placeholder="Search..."
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            ref={historyInputRef}
          />
          <kbd className="kbd kbd-sm text-xs py-0.5 px-1">t</kbd>
        </label>
        <ShortKeys keys={[Shortcut.T, Shortcut.ESCAPE]} />
        <div className="h-72 overflow-y-scroll">
          <table className="table table-xs table-pin-rows">
            <thead className="cursor-default">
              <tr>
                <th>Domain</th>
                <th className="text-end">Searched on</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistoryArray.map(
                ({ domain, searchedOn }: HistoryObject, idx: number) => {
                  const domainParts = domain.split(
                    new RegExp(`(${searchQuery})`)
                  );
                  return (
                    <tr
                      key={idx}
                      className="text-sm text-secondary hover cursor-pointer"
                      onClick={() => handleClick(domain)}
                    >
                      <td>
                        {domainParts.map((part: string, idx: number) => {
                          return part === searchQuery ? (
                            <span
                              key={idx}
                              className="bg-primary text-primary-content"
                            >
                              {part}
                            </span>
                          ) : (
                            <span key={idx}>{part}</span>
                          );
                        })}
                      </td>
                      <td className="text-end">
                        {new Date(Number(searchedOn)).toLocaleString()}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <div className="text-start">
          <button
            className="btn btn-outline btn-error btn-sm"
            onClick={() => {
              localStorage.removeItem('history');
              clearHistory();
            }}
          >
            <FaTrash />
            history
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsModalOpen(false)}>close</button>
      </form>
    </dialog>
  );
};

export default HistoryModal;

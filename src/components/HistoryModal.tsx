import { useEffect } from 'react';
import { useHistoryModal } from '../providers/HistoryProvider';
import { historyObject } from '../interfaces/HistoryObject';

const HistoryModal = () => {
  const { isModalOpen, history } = useHistoryModal();

  useEffect(() => {
    const modal: HTMLDialogElement = document.querySelector('#history_modal')!;

    if (isModalOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isModalOpen]);

  return (
    <dialog id="history_modal" className="modal">
      <div className="modal-box">
        <label
          className="flex items-center input input-sm input-bordered w-full mb-4"
          style={{ outline: 'none', boxShadow: 'none' }}
        >
          <input
            type="text"
            className="grow placeholder:text-xs"
            placeholder="Search..."
            autoFocus
            // value={searchQuery}
            // onChange={event => setSearchQuery(event.target.value)}
            // ref={inputRef}
          />
          <kbd className="kbd kbd-sm text-xs py-0.5 px-1">t</kbd>
        </label>
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Domain</th>
              <th className="text-end">Searched on</th>
            </tr>
          </thead>
          <tbody>
            {history
              .sort(
                (a: historyObject, b: historyObject) =>
                  Number(b.searchedOn) - Number(a.searchedOn)
              )
              .map(({ domain, searchedOn }: historyObject, idx: number) => (
                <tr key={idx} className="text-sm text-secondary hover">
                  <td>{domain}</td>
                  <td className="text-end">
                    {new Date(Number(searchedOn)).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <ul>
          {history
            .sort(
              (a: historyObject, b: historyObject) =>
                Number(b.searchedOn) - Number(a.searchedOn)
            )
            .map(({ domain, searchedOn }: historyObject, idx: number) => (
              <tr
                key={idx}
                className="flex justify-between text-sm text-secondary mt-1 hover:bg-base-200"
              >
                <td>{domain}</td>
                <td>{new Date(Number(searchedOn)).toLocaleString()}</td>
              </tr>
            ))}
        </ul> */}
      </div>
    </dialog>
  );
};

export default HistoryModal;

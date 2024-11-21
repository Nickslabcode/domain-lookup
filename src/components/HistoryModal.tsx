import { useEffect } from 'react';
import { useHistoryModal } from '../providers/HistoryProvider';

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
        <h3 className="font-bold text-lg">Search history</h3>
        <p className="py-4">Press ESC key to close</p>
        <ul>
          {history.map((domain: string, idx: string) => (
            <li key={idx}>{domain}</li>
          ))}
        </ul>
      </div>
    </dialog>
  );
};

export default HistoryModal;

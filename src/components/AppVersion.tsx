import { useEffect, useRef, useState } from 'react';
import { IoGitBranch } from 'react-icons/io5';
import { getChangelogInfo } from '../services/github.service';
import MarkdownRenderedComponent from './MardownRenderedComponent';
import { IoCloseSharp } from 'react-icons/io5';

const AppVersion = () => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [version, setVersion] = useState<string>('');
  const [changelog, setChangelog] = useState<[]>([]);

  useEffect(() => {
    const fetchChangelogData = async () => {
      try {
        const data = await getChangelogInfo();
        setVersion(data[0].tag_name);
        setChangelog(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChangelogData();
  }, []);

  const handleClick = () => {
    modalRef.current?.showModal();
  };

  return (
    <>
      <div
        className="flex items-center gap-1 mr-3 cursor-pointer hover:text-secondary-content"
        onClick={handleClick}
      >
        <IoGitBranch size={18} />
        <span className="font-semibold">{version}</span>
        <span className="bg-primary text-primary-content text-xs py-0.5 px-1 rounded-md">
          beta
        </span>
      </div>
      <dialog id="my_modal_2" className="modal backdrop-blur-sm" ref={modalRef}>
        <div className="modal-box text-start h-1/2 max-w-2xl">
          {changelog.map((data: Record<string, string>) => (
            <MarkdownRenderedComponent content={data.body} />
          ))}
          <form method="dialog">
            <button className=" btn-sm btn-circle absolute right-2 top-2 hover:text-secondary-content">
              <IoCloseSharp />
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default AppVersion;

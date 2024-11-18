import { IoReturnDownBackSharp } from 'react-icons/io5';

const ShortKeys = () => {
  return (
    <div className="flex gap-5 items-center justify-center text-secondary text-xs">
      <div className="flex gap-2 items-center">
        <kbd className="kbd kbd-sm text-xs py-0.5 px-1">t</kbd>{' '}
        <span>- Focus search bar</span>
      </div>
      <div className="flex gap-2 items-center">
        <kbd className="kbd kbd-sm flex gap-1">
          <IoReturnDownBackSharp />
          <span className="text-xs">Enter</span>
        </kbd>
        <span>- Search</span>
      </div>
      <div className="flex gap-2 items-center">
        <kbd className="kbd kbd-sm text-xs py-0.5 px-1">Esc</kbd>{' '}
        <span>- Open/close search history</span>
      </div>
    </div>
  );
};

export default ShortKeys;

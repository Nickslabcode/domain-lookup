import React from 'react';
import { IoReturnDownBackSharp } from 'react-icons/io5';
import { Shortcut } from '../enums/shortcut.enum';
import { cn } from '../helpers/cn.helper';

const ShortKeys: React.FC<{ keys: Shortcut[]; className?: string }> = ({
  keys,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex gap-5 items-center justify-center text-secondary text-xs cursor-default',
        className
      )}
    >
      {keys.includes(Shortcut.T) && (
        <div className="flex gap-2 items-center">
          <kbd className="kbd kbd-sm text-xs py-0.5 px-1">t</kbd>{' '}
          <span>- Focus search bar</span>
        </div>
      )}
      {keys.includes(Shortcut.ENTER) && (
        <div className="flex gap-2 items-center">
          <kbd className="kbd kbd-sm flex gap-1">
            <IoReturnDownBackSharp />
            <span className="text-xs">Enter</span>
          </kbd>
          <span>- Search</span>
        </div>
      )}
      {keys.includes(Shortcut.ESCAPE) && (
        <div className="flex gap-2 items-center">
          <kbd className="kbd kbd-sm text-xs py-0.5 px-1">Esc</kbd>{' '}
          <span>- Open/close search history</span>
        </div>
      )}
    </div>
  );
};

export default ShortKeys;

import React, { useState } from 'react';
import { Theme } from '../enums/Theme.enum';
import { useTheme } from '../providers/ThemeProvider';
import { FaPaintRoller } from 'react-icons/fa';
import { MdKeyboardArrowUp } from 'react-icons/md';

const ThemeController: React.FC = () => {
  const { theme, changeTheme } = useTheme();
  const [themes, _] = useState<Theme[]>(() => Object.values(Theme));

  return (
    <div className="dropdown dropdown-top">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost hover:bg-transparent btn-sm m-1 hover:text-neutral-content"
      >
        <FaPaintRoller />
        {theme}
        <MdKeyboardArrowUp size={16} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-200 rounded-box z-[1] p-2 shadow-md text-neutral-content"
      >
        {themes.map((theme: Theme, idx: number) => (
          <li key={idx}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              aria-label={theme}
              value={theme}
              onChange={() => changeTheme(theme)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeController;
